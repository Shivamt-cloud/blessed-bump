import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/emailValidation';
import Logo from './Logo';
import './AuthOverlay.css';

function AuthOverlay() {
  const {
    authModal,
    closeAuthModal,
    login,
    loginWithGoogle,
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (authModal.open) {
      setView(authModal.view || 'login');
      setError('');
      setInfoMessage('');
      setPhone('');
      setIsGoogleLoading(false);
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

    if (!name || !email || !password || !phone) {
      setError('Please complete all fields. Phone number is required.');
      return;
    }

    // Validate email format and check for disposable emails
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.error);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Phone number validation - must have at least 7 digits
    const numericPhoneLength = phone.replace(/[^0-9]/g, '').length;
    if (numericPhoneLength < 7) {
      setError('Phone number must include at least 7 digits.');
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
          
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📅</span>
              <div className="auth-feature-text">
                <strong>Week-by-Week Tracking</strong>
                <span>Follow your baby's growth journey</span>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🧭</span>
              <div className="auth-feature-text">
                <strong>Due Date Calculator</strong>
                <span>Plan your pregnancy timeline</span>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">💝</span>
              <div className="auth-feature-text">
                <strong>Personalized Dashboard</strong>
                <span>Your daily pregnancy companion</span>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">👥</span>
              <div className="auth-feature-text">
                <strong>Community Support</strong>
                <span>Connect with other expecting parents</span>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🔒</span>
              <div className="auth-feature-text">
                <strong>Secure & Private</strong>
                <span>Your data is safe and encrypted</span>
              </div>
            </div>
          </div>
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

            <button
              type="button"
              onClick={async () => {
                try {
                  setIsGoogleLoading(true);
                  setError('');
                  await loginWithGoogle();
                  // Show message that redirect is happening
                  setInfoMessage('Redirecting to Google...');
                } catch (err) {
                  setIsGoogleLoading(false);
                  setError(err.message || 'Unable to sign in with Google. Please try again.');
                }
              }}
              className="auth-btn-google"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <div className="auth-google-spinner"></div>
                  <span>Redirecting to Google...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.8449H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4"/>
                    <path d="M9 18C11.43 18 13.467 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65455 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40681 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                    <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65455 3.57955 9 3.57955Z" fill="#EA4335"/>
                  </svg>
                  {view === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

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
                <label htmlFor="auth-phone">Phone <span style={{ color: '#e91e63' }}>*</span></label>
                <input
                  id="auth-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number (e.g., +1 555 123 4567)"
                  autoComplete="tel"
                  pattern="^[0-9+()\\-\\s]{7,}$"
                  required
                />
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                  Required for account verification
                </p>
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
            💡 Sign up with a valid email address to start your pregnancy journey. Use Google login for instant access.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;

