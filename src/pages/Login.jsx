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
  const { login } = useAuth();
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

