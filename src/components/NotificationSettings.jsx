import React, { useState, useEffect } from 'react';
import {
  requestNotificationPermission,
  isNotificationPermissionGranted,
  registerServiceWorker,
  subscribeToPush,
  getPushSubscription,
  unsubscribeFromPush,
} from '../utils/notifications';
import './NotificationSettings.css';

function NotificationSettings() {
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    // Check permission status
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        setRegistration(reg);

        // Check push subscription
        if ('PushManager' in window) {
          const subscription = await getPushSubscription(reg);
          setIsSubscribed(!!subscription);
        }
      } catch (error) {
        console.error('Error checking notification status:', error);
      }
    }
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      // Request permission
      const granted = await requestNotificationPermission();
      if (!granted) {
        alert('Notification permission was denied. Please enable it in your browser settings.');
        setLoading(false);
        return;
      }

      setPermissionStatus('granted');

      // Register service worker if needed
      if (!registration && 'serviceWorker' in navigator) {
        const reg = await registerServiceWorker();
        setRegistration(reg);
      }

      // Subscribe to push (optional - requires backend)
      // For now, we'll just enable local notifications
      await checkNotificationStatus();
      
      alert('✅ Notifications enabled! You will now receive reminders and updates.');
    } catch (error) {
      console.error('Error enabling notifications:', error);
      alert('Error enabling notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setLoading(true);
    try {
      if (registration && 'PushManager' in window) {
        const subscription = await getPushSubscription(registration);
        if (subscription) {
          await unsubscribeFromPush(subscription);
        }
      }
      setIsSubscribed(false);
      alert('Notifications disabled.');
    } catch (error) {
      console.error('Error disabling notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPermissionStatusText = () => {
    switch (permissionStatus) {
      case 'granted':
        return '✅ Enabled';
      case 'denied':
        return '❌ Blocked';
      default:
        return '⚠️ Not Set';
    }
  };

  return (
    <div className="notification-settings">
      <div className="notification-settings-header">
        <h2>🔔 Notification Settings</h2>
        <p>Get reminders for check-ins, milestones, and personalized tips</p>
      </div>

      <div className="notification-status">
        <div className="status-item">
          <span className="status-label">Permission Status:</span>
          <span className={`status-value status-${permissionStatus}`}>
            {getPermissionStatusText()}
          </span>
        </div>
      </div>

      <div className="notification-actions">
        {permissionStatus !== 'granted' ? (
          <button
            type="button"
            onClick={handleEnableNotifications}
            disabled={loading}
            className="notification-btn enable-btn"
          >
            {loading ? 'Enabling...' : 'Enable Notifications'}
          </button>
        ) : (
          <div className="notification-enabled">
            <p>✅ Notifications are enabled!</p>
            <button
              type="button"
              onClick={handleDisableNotifications}
              disabled={loading}
              className="notification-btn disable-btn"
            >
              {loading ? 'Disabling...' : 'Disable Notifications'}
            </button>
          </div>
        )}
      </div>

      {permissionStatus === 'granted' && (
        <div className="notification-info">
          <h3>What you'll receive:</h3>
          <ul>
            <li>📅 Daily check-in reminders</li>
            <li>🎉 Milestone celebrations</li>
            <li>💡 Personalized wellness tips</li>
            <li>🩺 Appointment reminders</li>
            <li>💖 Baby growth updates</li>
          </ul>
        </div>
      )}

      {permissionStatus === 'denied' && (
        <div className="notification-help">
          <h3>Notifications are blocked</h3>
          <p>To enable notifications:</p>
          <ol>
            <li>Click the lock icon in your browser's address bar</li>
            <li>Find "Notifications" in the permissions list</li>
            <li>Change it to "Allow"</li>
            <li>Refresh this page</li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default NotificationSettings;

