import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import './DatabaseSyncCheck.css';

function DatabaseSyncCheck() {
  const { user, profile, session } = useAuth();
  const [syncStatus, setSyncStatus] = useState({
    connected: false,
    profileExists: false,
    dataSynced: false,
    error: null,
    details: {},
  });

  const checkDatabaseSync = async () => {
    const status = {
      connected: false,
      profileExists: false,
      dataSynced: false,
      error: null,
      details: {},
    };

    try {
      // Test 1: Check Supabase connection
      const { data: healthCheck, error: healthError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (healthError) {
        status.error = healthError.message;
        setSyncStatus(status);
        return;
      }

      status.connected = true;
      status.details.connection = '✅ Connected to Supabase';

      // Test 2: Check if user is authenticated
      if (!session?.user) {
        status.details.auth = '❌ No active session';
        setSyncStatus(status);
        return;
      }

      status.details.auth = '✅ User authenticated';

      // Test 3: Check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (profileError) {
        status.error = profileError.message;
        setSyncStatus(status);
        return;
      }

      if (profileData) {
        status.profileExists = true;
        status.details.profile = '✅ Profile exists in database';

        // Test 4: Check if pregnancy data is synced
        const hasLmpDate = !!profileData.lmp_date;
        const hasDueDate = !!profileData.due_date;

        status.dataSynced = hasLmpDate || hasDueDate;
        status.details.lmpDate = hasLmpDate
          ? `✅ LMP Date: ${profileData.lmp_date}`
          : '❌ No LMP date in database';
        status.details.dueDate = hasDueDate
          ? `✅ Due Date: ${profileData.due_date}`
          : '❌ No due date in database';

        // Additional profile data
        status.details.displayName = profileData.display_name || '❌ No display name';
        status.details.email = profileData.email || '❌ No email';
        status.details.phone = profileData.phone || '❌ No phone';
        status.details.updatedAt = profileData.updated_at
          ? `Last updated: ${new Date(profileData.updated_at).toLocaleString()}`
          : '❌ No update timestamp';
      } else {
        status.details.profile = '❌ Profile not found in database';
      }

      // Test 5: Check localStorage vs database
      const localData = localStorage.getItem('blessedbump_pregnancy_data');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          status.details.localStorage = {
            hasLmpDate: !!parsed.lmpDate,
            hasDueDate: !!parsed.dueDate,
            lmpDate: parsed.lmpDate || 'Not set',
            dueDate: parsed.dueDate || 'Not set',
          };
        } catch (e) {
          status.details.localStorage = '❌ Error parsing localStorage data';
        }
      } else {
        status.details.localStorage = '❌ No data in localStorage';
      }

      // Test 6: Compare localStorage with database
      if (profileData && localData) {
        try {
          const parsed = JSON.parse(localData);
          const dbLmp = profileData.lmp_date;
          const dbDue = profileData.due_date;
          const localLmp = parsed.lmpDate;
          const localDue = parsed.dueDate;

          const lmpMatch = !dbLmp || !localLmp || dbLmp === localLmp || dbLmp.split('T')[0] === localLmp;
          const dueMatch = !dbDue || !localDue || dbDue === localDue || dbDue.split('T')[0] === localDue?.split('T')[0];

          status.details.syncMatch = {
            lmpDate: lmpMatch ? '✅ Synced' : '⚠️ Mismatch',
            dueDate: dueMatch ? '✅ Synced' : '⚠️ Mismatch',
          };
        } catch (e) {
          status.details.syncMatch = '❌ Error comparing data';
        }
      }
    } catch (error) {
      status.error = error.message || 'Unknown error';
    }

    setSyncStatus(status);
  };

  useEffect(() => {
    if (user || session) {
      checkDatabaseSync();
    }
  }, [user, session]);

  if (!user && !session) {
    return (
      <div className="db-sync-check">
        <div className="sync-status-card">
          <h3>Database Sync Status</h3>
          <p>Please log in to check database sync status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="db-sync-check">
      <div className="sync-status-card">
        <div className="sync-header">
          <h3>Database Sync Status</h3>
          <button type="button" onClick={checkDatabaseSync} className="sync-refresh-btn">
            🔄 Refresh
          </button>
        </div>

        <div className="sync-summary">
          <div className={`sync-indicator ${syncStatus.connected ? 'connected' : 'disconnected'}`}>
            <span className="sync-dot" />
            <span>
              {syncStatus.connected ? 'Connected to Database' : 'Not Connected'}
            </span>
          </div>
          <div className={`sync-indicator ${syncStatus.profileExists ? 'synced' : 'not-synced'}`}>
            <span className="sync-dot" />
            <span>
              {syncStatus.profileExists ? 'Profile Exists' : 'Profile Missing'}
            </span>
          </div>
          <div className={`sync-indicator ${syncStatus.dataSynced ? 'synced' : 'not-synced'}`}>
            <span className="sync-dot" />
            <span>
              {syncStatus.dataSynced ? 'Data Synced' : 'No Data in Database'}
            </span>
          </div>
        </div>

        {syncStatus.error && (
          <div className="sync-error">
            <strong>Error:</strong> {syncStatus.error}
          </div>
        )}

        <div className="sync-details">
          <h4>Details</h4>
          <ul>
            {Object.entries(syncStatus.details).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return (
                  <li key={key}>
                    <strong>{key}:</strong>
                    <ul>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                          {subKey}: {String(subValue)}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sync-actions">
          <p className="sync-note">
            💡 This diagnostic tool helps verify that your data is properly synced between the app and Supabase database.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DatabaseSyncCheck;

