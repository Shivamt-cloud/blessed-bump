import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Install.css';

function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [deviceType, setDeviceType] = useState('unknown');
  const navigate = useNavigate();

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);
    const isDesktop = !isIOS && !isAndroid;

    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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
    }
  };

  const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div className="install-page">
      <div className="install-container">
        <div className="install-header">
          <div className="install-icon">📱</div>
          <h1>Install BlessedBump App</h1>
          <p className="install-subtitle">
            Transform your browser experience into a native app!
          </p>
        </div>

        {isInstalled ? (
          <div className="install-success">
            <div className="success-icon">✅</div>
            <h2>You've already installed BlessedBump!</h2>
            <p>Enjoy the app experience. If you need help, contact our support.</p>
          </div>
        ) : (
          <>
            <div className="install-benefits">
              <h2>Why Install?</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🚀</div>
                  <h3>Instant Access</h3>
                  <p>Open BlessedBump with one tap from your home screen - no need to open a browser.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">📴</div>
                  <h3>Works Offline</h3>
                  <p>Access your pregnancy journey, saved notes, and tracked data even without internet connection.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">⚡</div>
                  <h3>Faster Performance</h3>
                  <p>Enjoy app-like speed and smooth animations optimized for your device.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🔔</div>
                  <h3>Smart Notifications</h3>
                  <p>Get gentle reminders for check-ins, milestones, and personalized tips.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">💾</div>
                  <h3>Sync Across Devices</h3>
                  <p>Your data syncs automatically - use it on your phone, tablet, and desktop seamlessly.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🎨</div>
                  <h3>App-Like Experience</h3>
                  <p>Full-screen experience without browser bars - feels like a native app.</p>
                </div>
              </div>
            </div>

            <div className="install-instructions">
              <h2>How to Install</h2>
              
              {deviceType === 'ios' && (
                <div className="device-instructions">
                  <h3>📱 iPhone/iPad (Safari)</h3>
                  <ol>
                    <li>Open BlessedBump in <strong>Safari</strong> (not Chrome or other browsers)</li>
                    <li>Tap the <strong>Share</strong> button <span className="instruction-icon">📤</span> at the bottom of the screen</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                    <li>Tap <strong>"Add"</strong> in the top right corner</li>
                    <li>BlessedBump will appear on your home screen!</li>
                  </ol>
                  <div className="instruction-note">
                    <strong>Note:</strong> Installation only works in Safari. If you're using Chrome or another browser, 
                    please switch to Safari to install the app.
                  </div>
                </div>
              )}

              {deviceType === 'android' && (
                <div className="device-instructions">
                  <h3>📱 Android (Chrome)</h3>
                  <ol>
                    <li>Open BlessedBump in <strong>Chrome</strong> browser</li>
                    <li>Tap the <strong>Menu</strong> button <span className="instruction-icon">⋮</span> in the top right</li>
                    <li>Look for <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
                    <li>Tap <strong>"Install"</strong> in the popup</li>
                    <li>BlessedBump will appear on your home screen!</li>
                  </ol>
                  <div className="instruction-note">
                    <strong>Note:</strong> If you don't see the install option, make sure you're using Chrome browser 
                    and have visited the site at least once before.
                  </div>
                </div>
              )}

              {deviceType === 'desktop' && (
                <div className="device-instructions">
                  <h3>💻 Desktop (Chrome/Edge)</h3>
                  <ol>
                    <li>Look for the <strong>install icon</strong> <span className="instruction-icon">➕</span> in your browser's address bar</li>
                    <li>Click the install icon or go to <strong>Menu</strong> → <strong>"Install BlessedBump"</strong></li>
                    <li>Click <strong>"Install"</strong> in the popup</li>
                    <li>BlessedBump will open in its own window!</li>
                  </ol>
                  <div className="device-instructions">
                    <h3>💻 Mac (Safari)</h3>
                    <ol>
                      <li>Open BlessedBump in Safari</li>
                      <li>Click <strong>File</strong> → <strong>"Add to Dock"</strong></li>
                      <li>BlessedBump will appear in your Dock!</li>
                    </ol>
                  </div>
                  <div className="instruction-note">
                    <strong>Note:</strong> Desktop installation works best in Chrome, Edge, or Safari. 
                    The install option may not be available in all browsers.
                  </div>
                </div>
              )}

              {deviceType === 'unknown' && (
                <div className="device-instructions">
                  <h3>📱 Mobile (iPhone/iPad - Safari)</h3>
                  <ol>
                    <li>Tap the <strong>Share</strong> button at the bottom</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                    <li>Tap <strong>"Add"</strong> in the top right</li>
                    <li>BlessedBump will appear on your home screen!</li>
                  </ol>
                  
                  <h3>📱 Mobile (Android - Chrome)</h3>
                  <ol>
                    <li>Tap the <strong>Menu</strong> (three dots) in the top right</li>
                    <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
                    <li>Tap <strong>"Install"</strong> in the popup</li>
                    <li>BlessedBump will appear on your home screen!</li>
                  </ol>
                  
                  <h3>💻 Desktop (Chrome/Edge)</h3>
                  <ol>
                    <li>Look for the <strong>install icon</strong> (➕) in your browser's address bar</li>
                    <li>Click <strong>"Install"</strong> in the popup</li>
                    <li>BlessedBump will open in its own window!</li>
                  </ol>
                </div>
              )}
            </div>

            {deferredPrompt && (
              <div className="install-action">
                <button
                  type="button"
                  onClick={handleInstall}
                  className="install-page-btn"
                >
                  Install BlessedBump Now
                </button>
                <p className="install-action-note">
                  Click the button above to install BlessedBump on your device.
                </p>
              </div>
            )}

            <div className="install-help">
              <h3>Need Help?</h3>
              <p>
                If you're having trouble installing, please contact us at{' '}
                <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a> or check our{' '}
                <button
                  type="button"
                  onClick={() => navigate('/faq')}
                  className="link-button"
                >
                  FAQ
                </button>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Install;

