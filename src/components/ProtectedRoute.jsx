import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading, session, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Only open modal if we're not loading and truly have no user/session
    // Also check session in case user object hasn't populated yet
    if (!loading && !user && !session) {
      openAuthModal('login', location.pathname);
    }
  }, [loading, user, session, location.pathname, openAuthModal]);

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

