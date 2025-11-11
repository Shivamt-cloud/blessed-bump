import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, openAuthModal } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Small delay to ensure all state is cleared
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Force a full page reload to clear all cached data and ensure clean state
      window.location.replace('/calculator');
    } catch (error) {
      console.error('Logout error', error);
      // Even on error, clear storage and reload
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace('/calculator');
    }
  };

  const handleLinkClick = (event, path) => {
    if (!user && !['/calculator', '/fertility'].includes(path)) {
      event.preventDefault();
      openAuthModal('login', path);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: '/dashboard',
      icon: '🌟',
      label: 'GlowBoard',
      caption: 'Your daily pulse',
    },
    {
      path: '/tracker',
      icon: '🧭',
      label: 'Journey Keeper',
      caption: 'Week-by-week path',
    },
    {
      path: '/calculator',
      icon: '🗓️',
      label: 'Due-Date Oracle',
      caption: 'Plan the countdown',
    },
    {
      path: '/fertility',
      icon: '🌸',
      label: 'Fertility Oracle',
      caption: 'Tune into your cycle',
    },
    {
      path: '/community',
      icon: '🤝',
      label: 'Village Voice',
      caption: 'Share & support',
    },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/calculator" className="nav-logo">
          <Logo size={40} />
          <div className="logo-wordmark">
            <span className="logo-text">BlessedBump</span>
            <span className="logo-tagline">Because every pregnancy story deserves to be celebrated</span>
          </div>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={(event) => handleLinkClick(event, item.path)}
            >
              <span className="nav-icon" aria-hidden>
                {item.icon}
              </span>
              <div className="nav-text">
                <span className="nav-label">{item.label}</span>
                <span className="nav-caption">{item.caption}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="nav-user">
          {user ? (
            <>
              <button
                type="button"
                className="user-name"
                onClick={() => navigate('/profile')}
                title="Open profile"
              >
                {user.avatar ? (
                  <span className="user-avatar" aria-hidden>
                    <img src={user.avatar} alt={`${user.name || 'User'} avatar`} />
                  </span>
                ) : (
                  <span className="user-avatar placeholder" aria-hidden>
                    {(user.name || 'M').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="user-name-text">
                  {user.name ? `Hi, ${user.name}!` : 'Your profile'}
                </span>
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <button type="button" className="login-btn" onClick={() => openAuthModal('login')}>
              Login / Join
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

