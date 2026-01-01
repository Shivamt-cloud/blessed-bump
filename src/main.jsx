import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

    // Register service worker for PWA (after React renders)
    // Only register in production, skip in development to avoid interfering with Vite HMR
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check if we're in production (Vite sets import.meta.env.PROD)
      const isProduction = import.meta.env.PROD;
      
      if (isProduction) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('✅ Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
              console.log('❌ Service Worker registration failed:', error);
            });
        });
      } else {
        // In development, unregister any existing service workers
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
            console.log('🔄 Service Worker unregistered for development');
          });
        });
      }
    }

// Handle PWA install prompt
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log('💡 PWA install prompt available');
  });

  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA was installed');
    window.deferredPrompt = null;
  });
}
