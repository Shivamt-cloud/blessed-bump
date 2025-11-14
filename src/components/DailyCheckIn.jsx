import React, { useState, useEffect } from 'react';
import '../pages/Dashboard.css';
import './DailyCheckIn.css';

const energyLevels = ['Gentle', 'Steady', 'Bright', 'Peaceful', 'Energetic'];
const cravingOptions = [
  'Sweet berries',
  'Crunchy veggies',
  'Comfort soup',
  'Citrus splash',
  'Chocolate',
  'Salty snacks',
  'Fresh fruits',
  'No specific cravings',
];

function DailyCheckIn({ user }) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const [checkInData, setCheckInData] = useState({
    energy: null,
    energyLevel: 'Steady',
    movementSessions: 0,
    movementGoal: 5,
    cravings: null,
    lastUpdated: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);

  useEffect(() => {
    // Load today's check-in data
    const savedData = localStorage.getItem(`blessedbump_checkin_${today}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCheckInData(parsed);
      } catch (e) {
        console.error('Failed to load check-in data', e);
      }
    }
  }, [today]);

  const saveCheckInData = (data) => {
    const dataToSave = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(`blessedbump_checkin_${today}`, JSON.stringify(dataToSave));
    setCheckInData(dataToSave);
  };

  const handleEnergyChange = (level) => {
    const energyIndex = energyLevels.indexOf(level);
    const percent = 20 + (energyIndex * 20); // 20, 40, 60, 80, 100
    
    saveCheckInData({
      ...checkInData,
      energy: percent,
      energyLevel: level,
    });
    setIsEditing(false);
  };

  const handleMovementUpdate = (sessions) => {
    const percent = Math.min(100, Math.round((sessions / checkInData.movementGoal) * 100));
    
    saveCheckInData({
      ...checkInData,
      movementSessions: sessions,
    });
    setShowMovementModal(false);
  };

  const handleCravingsChange = (craving) => {
    const percent = 50 + (Math.random() * 30); // Random between 50-80 for variety
    
    saveCheckInData({
      ...checkInData,
      cravings: craving,
    });
    setIsEditing(false);
  };

  // Calculate default values if not set
  const energyPercent = checkInData.energy !== null 
    ? checkInData.energy 
    : 65;
  const energyLevel = checkInData.energyLevel || 'Steady';
  
  const movementSessions = checkInData.movementSessions || 0;
  const movementPercent = Math.min(100, Math.round((movementSessions / checkInData.movementGoal) * 100));
  
  const currentCraving = checkInData.cravings || cravingOptions[0];
  const cravingsPercent = checkInData.cravings ? 60 : 50;

  const checkInMetrics = [
    {
      label: 'Energy',
      icon: '⚡️',
      level: energyLevel,
      percent: energyPercent,
      color: '#ffd700',
      editable: true,
      onEdit: () => setIsEditing('energy'),
    },
    {
      label: 'Movement',
      icon: '🚶‍♀️',
      level: `${movementSessions} of ${checkInData.movementGoal} sessions`,
      percent: movementPercent,
      color: '#4caf50',
      editable: true,
      onEdit: () => setShowMovementModal(true),
    },
    {
      label: 'Cravings',
      icon: '🍓',
      level: currentCraving,
      percent: cravingsPercent,
      color: '#ff6b9d',
      editable: true,
      onEdit: () => setIsEditing('cravings'),
    },
  ];

  return (
    <div className="check-in-section">
      <div className="check-in-section-header">
        <div>
          <h3>📊 Today's Check-in</h3>
          <p className="check-in-section-subtitle">Track your daily wellness metrics</p>
        </div>
        {checkInData.lastUpdated && (
          <span className="check-in-last-updated">
            Updated: {new Date(checkInData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      
      <div className="check-in-grid">
        {checkInMetrics.map((item) => (
          <div 
            className="check-in-card" 
            key={item.label} 
            title={`${item.label}: ${item.level}`}
            onClick={item.editable ? item.onEdit : undefined}
          >
            <div className="check-in-header">
              <span className="check-in-icon">{item.icon}</span>
              <span className="check-in-label">{item.label}</span>
              {item.editable && (
                <button 
                  className="check-in-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onEdit();
                  }}
                  title="Update this metric"
                >
                  ✏️
                </button>
              )}
            </div>
            <p className="check-in-level">{item.level}</p>
            <div className="check-in-meter">
              <div
                className="check-in-meter-fill"
                style={{ 
                  width: `${Math.min(item.percent, 100)}%`,
                  background: item.color ? `linear-gradient(90deg, ${item.color} 0%, ${item.color}dd 100%)` : undefined
                }}
              />
            </div>
            <div className="check-in-percent">{Math.min(item.percent, 100)}%</div>
          </div>
        ))}
      </div>

      {/* Energy Level Modal */}
      {isEditing === 'energy' && (
        <div className="check-in-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="check-in-modal" onClick={(e) => e.stopPropagation()}>
            <button className="check-in-modal-close" onClick={() => setIsEditing(false)}>×</button>
            <h3>How's your energy today?</h3>
            <div className="check-in-options">
              {energyLevels.map((level) => (
                <button
                  key={level}
                  className={`check-in-option ${energyLevel === level ? 'selected' : ''}`}
                  onClick={() => handleEnergyChange(level)}
                >
                  <span className="option-label">{level}</span>
                  <span className="option-percent">
                    {20 + (energyLevels.indexOf(level) * 20)}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Movement Sessions Modal */}
      {showMovementModal && (
        <div className="check-in-modal-overlay" onClick={() => setShowMovementModal(false)}>
          <div className="check-in-modal" onClick={(e) => e.stopPropagation()}>
            <button className="check-in-modal-close" onClick={() => setShowMovementModal(false)}>×</button>
            <h3>How many movement sessions today?</h3>
            <p className="check-in-modal-hint">Goal: {checkInData.movementGoal} sessions</p>
            <div className="movement-sessions-control">
              <button
                className="movement-btn decrease"
                onClick={() => handleMovementUpdate(Math.max(0, movementSessions - 1))}
                disabled={movementSessions === 0}
              >
                −
              </button>
              <div className="movement-sessions-display">
                <span className="movement-sessions-count">{movementSessions}</span>
                <span className="movement-sessions-goal">/ {checkInData.movementGoal}</span>
              </div>
              <button
                className="movement-btn increase"
                onClick={() => handleMovementUpdate(Math.min(checkInData.movementGoal, movementSessions + 1))}
                disabled={movementSessions >= checkInData.movementGoal}
              >
                +
              </button>
            </div>
            <div className="movement-progress-preview">
              <div className="movement-progress-bar">
                <div
                  className="movement-progress-fill"
                  style={{ 
                    width: `${Math.min(100, Math.round((movementSessions / checkInData.movementGoal) * 100))}%`
                  }}
                />
              </div>
              <span className="movement-progress-text">
                {Math.min(100, Math.round((movementSessions / checkInData.movementGoal) * 100))}% complete
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Cravings Modal */}
      {isEditing === 'cravings' && (
        <div className="check-in-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="check-in-modal" onClick={(e) => e.stopPropagation()}>
            <button className="check-in-modal-close" onClick={() => setIsEditing(false)}>×</button>
            <h3>What are you craving today?</h3>
            <div className="check-in-options cravings-options">
              {cravingOptions.map((craving) => (
                <button
                  key={craving}
                  className={`check-in-option ${currentCraving === craving ? 'selected' : ''}`}
                  onClick={() => handleCravingsChange(craving)}
                >
                  <span className="option-label">{craving}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyCheckIn;

