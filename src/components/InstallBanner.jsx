import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstallBanner.css';

function InstallBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  // Check if user has dismissed before
  React.useEffect(() => {
    const dismissed = localStorage.getItem('blessedbump_dashboard_install_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('blessedbump_dashboard_install_dismissed', 'true');
  };

  const handleInstall = () => {
    navigate('/install');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="install-banner">
      <div className="install-banner-content">
        <div className="install-banner-icon">📱</div>
        <div className="install-banner-text">
          <h3>Download BlessedBump as an App</h3>
          <p>Get instant access, work offline, and never miss a milestone!</p>
        </div>
        <div className="install-banner-actions">
          <button
            type="button"
            onClick={handleInstall}
            className="install-banner-btn install-btn"
          >
            Install Now
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="install-banner-close"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallBanner;

