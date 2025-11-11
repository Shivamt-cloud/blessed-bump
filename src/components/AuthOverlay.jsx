import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './AuthOverlay.css';

function AuthOverlay() {
  const {
    authModal,
    closeAuthModal,
    login,
    signup,
    user,
    loading,
    session,
  } = useAuth();
  const navigate = useNavigate();
  const loginCheckRef = useRef(null);
  const waitingForAuthRef = useRef(false);

  const [view, setView] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);

  useEffect(() => {
    if (authModal.open) {
      setView(authModal.view || 'login');
      setError('');
      setInfoMessage('');
      setPhone('');
    }
  }, [authModal]);

  useEffect(() => {
    if (!authModal.open) {
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setError('');
      setInfoMessage('');
      setIsSubmitting(false);
      setWaitingForAuth(false);
      waitingForAuthRef.current = false;
      // Clean up any pending login check (timeout or interval)
      if (loginCheckRef.current) {
        clearTimeout(loginCheckRef.current);
        clearInterval(loginCheckRef.current);
        loginCheckRef.current = null;
      }
    }
  }, [authModal.open]);

  useEffect(() => {
    if (!authModal.open) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [authModal.open]);

  // Auto-close modal and navigate when user becomes available after login
  useEffect(() => {
    if (authModal.open && !loading && (user || session)) {
      // Clear any pending timeouts/intervals
      if (loginCheckRef.current) {
        clearTimeout(loginCheckRef.current);
        clearInterval(loginCheckRef.current);
        loginCheckRef.current = null;
      }
      setIsSubmitting(false);
      setWaitingForAuth(false);
      waitingForAuthRef.current = false;
      const destination = authModal.redirectTo ?? '/dashboard';
      closeAuthModal();
      // Use setTimeout to ensure state updates are complete
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 200);
    }
  }, [authModal.open, loading, user, session, navigate, closeAuthModal, authModal.redirectTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loginCheckRef.current) {
        clearTimeout(loginCheckRef.current);
        clearInterval(loginCheckRef.current);
        loginCheckRef.current = null;
      }
    };
  }, []);

  const destination = useMemo(() => authModal.redirectTo ?? '/dashboard', [authModal.redirectTo]);

  if (!authModal.open) {
    return null;
  }

  const handleClose = () => {
    closeAuthModal();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (!email || !password) {
      setError('Please fill in email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setWaitingForAuth(true);
      waitingForAuthRef.current = true;
      await login({ email, password });
      
      // Fallback: if user state doesn't update within 2.5 seconds, force navigation
      const fallbackTimeout = setTimeout(() => {
        if (waitingForAuthRef.current && authModal.open) {
          setIsSubmitting(false);
          setWaitingForAuth(false);
          waitingForAuthRef.current = false;
          const destination = authModal.redirectTo ?? '/dashboard';
          closeAuthModal();
          window.location.href = destination;
        }
      }, 2500);
      
      // Store timeout ID for cleanup
      loginCheckRef.current = fallbackTimeout;
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in. Please try again.');
      setIsSubmitting(false);
      setWaitingForAuth(false);
      waitingForAuthRef.current = false;
      if (loginCheckRef.current) {
        clearTimeout(loginCheckRef.current);
        loginCheckRef.current = null;
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (!name || !email || !password) {
      setError('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const numericPhoneLength = phone ? phone.replace(/[^0-9]/g, '').length : 0;
    if (phone && numericPhoneLength < 7) {
      setError('Phone number should include at least 7 digits.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await signup({ email, password, name, phone: phone.trim() });

      if (data.session) {
        // Session created - let useEffect handle navigation when user state updates
        // Don't navigate here
      } else {
        // Email confirmation required
        setInfoMessage(
          'Check your email to confirm your account, then sign in to continue.',
        );
        setIsSubmitting(false);
      }
    } catch (signupError) {
      setError(signupError.message || 'Unable to create account. Please try again.');
      setIsSubmitting(false);
    }
  };

  const switchTo = (nextView) => {
    setView(nextView);
    setError('');
    setInfoMessage('');
    setPhone('');
  };

  return (
    <div className="auth-overlay">
      <div className="auth-backdrop" onClick={handleClose} />
      <div className="auth-modal" role="dialog" aria-modal="true">
        <button className="auth-close" type="button" onClick={handleClose} aria-label="Close authentication">
          ✕
        </button>
        <div className="auth-branding">
          <div className="auth-logo-row">
            <Logo size={56} />
            <div className="auth-wordmark">
              <span className="auth-brand-name">BlessedBump</span>
              <span className="auth-brand-tagline">Because every pregnancy story deserves to be celebrated</span>
            </div>
          </div>
          <h2>{view === 'login' ? 'Welcome back, luminous mama!' : 'Join the Blessed Bump circle'}</h2>
          <p>
            {view === 'login'
              ? 'Sign in to sync your milestones, track your journey, and unlock personalised rituals.'
              : 'Create your account to celebrate milestones, cherish insights, and glow with the community.'}
          </p>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-toggle">
            <button
              type="button"
              className={`auth-toggle-btn ${view === 'login' ? 'active' : ''}`}
              onClick={() => switchTo('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-toggle-btn ${view === 'signup' ? 'active' : ''}`}
              onClick={() => switchTo('signup')}
            >
              Create account
            </button>
          </div>

          <form onSubmit={view === 'login' ? handleLogin : handleSignup} className="auth-form">
            {error && <div className="auth-error">{error}</div>}
            {!error && infoMessage && <div className="auth-info">{infoMessage}</div>}

            {view === 'signup' && (
              <div className="auth-field">
                <label htmlFor="auth-name">Name</label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </div>
            )}

            {view === 'signup' && (
              <div className="auth-field">
                <label htmlFor="auth-phone">Phone (optional)</label>
                <input
                  id="auth-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Add your phone number"
                  autoComplete="tel"
                  pattern="^[0-9+()\\-\\s]{7,}$"
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={view === 'login' ? 'Enter your password' : 'Minimum 6 characters'}
                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={isSubmitting}>
              {view === 'login' ? 'Mark this stop as logged in' : 'Join Blessed Bump'}
            </button>
            {isSubmitting && (
              <p className="auth-progress">We’re preparing your glow…</p>
            )}
          </form>

          <p className="auth-footnote">
            💡 Create a demo account with any email & password combo to explore Blessed Bump.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;

