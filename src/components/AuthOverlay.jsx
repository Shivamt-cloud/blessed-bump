import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './AuthOverlay.css';

function AuthOverlay() {
  const {
    authModal,
    closeAuthModal,
    login,
  } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authModal.open) {
      setView(authModal.view || 'login');
      setError('');
    }
  }, [authModal]);

  useEffect(() => {
    if (!authModal.open) {
      setName('');
      setEmail('');
      setPassword('');
      setError('');
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

  const destination = useMemo(() => authModal.redirectTo ?? '/dashboard', [authModal.redirectTo]);

  if (!authModal.open) {
    return null;
  }

  const handleClose = () => {
    closeAuthModal();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in email and password.');
      return;
    }

    const pregnancyDataRaw = localStorage.getItem('blessedbump_pregnancy_data');
    const pregnancyData = pregnancyDataRaw ? JSON.parse(pregnancyDataRaw) : null;

    const userData = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      dueDate: pregnancyData?.dueDate ?? null,
    };

    login(userData);
    handleClose();
    navigate(destination);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const userData = {
      id: Date.now().toString(),
      email,
      name,
      dueDate: null,
    };

    login(userData);
    handleClose();
    navigate(destination);
  };

  const switchTo = (nextView) => {
    setView(nextView);
    setError('');
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
            <span className="auth-brand-name">BlessedBump</span>
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

            <button type="submit" className="auth-submit">
              {view === 'login' ? 'Mark this stop as logged in' : 'Join Blessed Bump'}
            </button>
          </form>

          <p className="auth-footnote">
            💡 Demo mode: use any email & password combination to explore the Blessed Bump experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;

