import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstallPrompt.css';

function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has dismissed before (localStorage)
    const dismissed = localStorage.getItem('blessedbump_install_dismissed');
    const visitCount = parseInt(localStorage.getItem('blessedbump_visit_count') || '0', 10);
    
    // Show prompt if:
    // - User has visited 1+ times (lowered for better UX)
    // - Not dismissed before
    // - Not already installed
    if (visitCount >= 1 && !dismissed && !isInstalled) {
      setShowPrompt(true);
    }

    // Listen for beforeinstallprompt event (Chrome/Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt if conditions are met
      if (visitCount >= 1 && !dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Increment visit count
    const newVisitCount = visitCount + 1;
    localStorage.setItem('blessedbump_visit_count', newVisitCount.toString());

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else {
      // For iOS Safari or browsers without beforeinstallprompt
      // Navigate to install page with instructions
      navigate('/install');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('blessedbump_install_dismissed', 'true');
  };

  const handleLearnMore = () => {
    navigate('/install');
    setShowPrompt(false);
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-icon">📱</div>
        <div className="install-prompt-text">
          <h3>Install BlessedBump</h3>
          <p>Get instant access, work offline, and never miss a milestone!</p>
        </div>
        <div className="install-prompt-actions">
          <button
            type="button"
            onClick={handleInstall}
            className="install-prompt-btn install-btn"
          >
            Install Now
          </button>
          <button
            type="button"
            onClick={handleLearnMore}
            className="install-prompt-btn learn-more-btn"
          >
            Learn More
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="install-prompt-close"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;

