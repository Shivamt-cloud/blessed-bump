import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate('/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo size={60} />
            <div className="login-wordmark">
              <h1>Welcome to BlessedBump</h1>
              <span className="login-tagline">Because every pregnancy story deserves to be celebrated</span>
            </div>
          <p>Your pregnancy & parenting companion</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <button
            type="button"
            onClick={async () => {
              try {
                setIsGoogleLoading(true);
                setError('');
                await loginWithGoogle();
              } catch (err) {
                setIsGoogleLoading(false);
                setError(err.message || 'Unable to sign in with Google. Please try again.');
              }
            }}
            className="btn-google"
            disabled={isSubmitting || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <div className="google-spinner"></div>
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
                Sign in with Google
              </>
            )}
          </button>
          
          <div className="login-divider">
            <span>or</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            Sign In
          </button>
          {isSubmitting && <p className="auth-progress">Signing you in…</p>}
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className="demo-note">
            💡 Create a demo account with any email/password to explore.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

