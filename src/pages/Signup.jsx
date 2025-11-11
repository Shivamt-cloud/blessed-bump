import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Login.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (phone && phone.replace(/[^0-9]/g, '').length < 7) {
      setError('Phone number should include at least 7 digits.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await signup({ email, password, name, phone: phone.trim() });

      if (data.session) {
        navigate('/dashboard', { replace: true });
      } else {
        setInfoMessage(
          'Check your email to confirm your account, then sign in to continue.',
        );
      }
    } catch (signupError) {
      setError(signupError.message || 'Unable to create account. Please try again.');
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
              <h1>Join BlessedBump</h1>
              <span className="login-tagline">Because every pregnancy story deserves to be celebrated</span>
            </div>
          <p>Start your pregnancy journey with us</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          {!error && infoMessage && <div className="auth-info">{infoMessage}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Add your phone number"
            />
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
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            Sign Up
          </button>
          {isSubmitting && <p className="auth-progress">Creating your account…</p>}
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

