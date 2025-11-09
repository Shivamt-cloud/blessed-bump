import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation (in production, this would call an API)
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock login - in production, verify with backend
    const userData = {
      id: '1',
      email,
      name: email.split('@')[0],
      dueDate: localStorage.getItem('blessedbump_pregnancy_data') 
        ? JSON.parse(localStorage.getItem('blessedbump_pregnancy_data')).dueDate 
        : null,
    };

    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo size={60} />
          <h1>Welcome to BlessedBump</h1>
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

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className="demo-note">
            💡 Demo mode: Use any email/password to explore
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

