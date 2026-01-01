import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading, session, openAuthModal } = useAuth();
  const location = useLocation();
  const hasCheckedAuth = useRef(false);
  const isOAuthCallback = useRef(false);

  // Check if this is an OAuth callback (URL has access_token or code)
  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    if (hash.includes('access_token') || hash.includes('code=') || search.includes('code=')) {
      isOAuthCallback.current = true;
      // Clear after 5 seconds (OAuth callback should complete by then)
      setTimeout(() => {
        isOAuthCallback.current = false;
      }, 5000);
    }
  }, []);

  useEffect(() => {
    // Don't open modal if:
    // 1. Still loading
    // 2. User or session exists
    // 3. This is an OAuth callback (wait for it to complete)
    // 4. We've already checked once (prevent loops)
    if (loading || user || session || isOAuthCallback.current) {
      return;
    }

    // Only open modal once, and only if truly no user/session
    if (!hasCheckedAuth.current && !user && !session) {
      hasCheckedAuth.current = true;
      // Small delay to ensure session restoration has time to complete
      const timer = setTimeout(() => {
        // Check again before opening modal (session might have been restored)
        if (!user && !session) {
          openAuthModal('login', location.pathname);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, session, location.pathname, openAuthModal]);

  // Reset check flag if user/session appears
  useEffect(() => {
    if (user || session) {
      hasCheckedAuth.current = false;
    }
  }, [user, session]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👶</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Check both user and session - session might be available before user object is built
  if (!user && !session) {
    return <Navigate to="/calculator" replace />;
  }

  return children;
}

export default ProtectedRoute;

