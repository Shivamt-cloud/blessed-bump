import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout, openAuthModal, session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isOAuthCallback, setIsOAuthCallback] = React.useState(false);

  // Check if this is an OAuth callback (URL has access_token or code)
  React.useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    if (hash.includes('access_token') || hash.includes('code=') || search.includes('code=')) {
      setIsOAuthCallback(true);
      // Keep showing loading state for up to 10 seconds to allow session restoration
      const timeout = setTimeout(() => {
        setIsOAuthCallback(false);
      }, 10000);
      return () => clearTimeout(timeout);
    } else {
      setIsOAuthCallback(false);
    }
  }, []);

  // Hide OAuth callback state once we have a session
  React.useEffect(() => {
    if (isOAuthCallback && (user || session)) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsOAuthCallback(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOAuthCallback, user, session]);

  // Debug: Log user state changes
  React.useEffect(() => {
    console.log('Navigation - User state changed:', { 
      hasUser: !!user, 
      hasSession: !!session,
      userName: user?.name, 
      userEmail: user?.email,
      loading,
      isOAuthCallback
    });
  }, [user, session, loading, isOAuthCallback]);

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
    if (!user && !session && !['/calculator', '/fertility'].includes(path)) {
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (event, path) => {
    handleLinkClick(event, path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/calculator" className="nav-logo">
          <Logo size={100} />
          <div className="logo-wordmark">
            <span className="logo-text">BlessedBump</span>
            <span className="logo-tagline">Because every pregnancy story deserves to be celebrated</span>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className={`mobile-menu-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={(event) => handleNavClick(event, item.path)}
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

          <div className={`nav-user ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {(loading || isOAuthCallback) ? (
            <div className="nav-loading" style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              color: 'rgba(44, 32, 87, 0.6)'
            }}>
              {isOAuthCallback ? 'Signing in...' : 'Loading...'}
            </div>
          ) : (user || session) ? (
            <>
              <button
                type="button"
                className="user-name"
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                title="Open profile"
              >
                {user?.avatar ? (
                  <span className="user-avatar" aria-hidden>
                    <img src={user.avatar} alt={`${user.name || 'User'} avatar`} />
                  </span>
                ) : (
                  <span className="user-avatar placeholder" aria-hidden>
                    {(user?.name || user?.email || session?.user?.email || 'M').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="user-name-text">
                  {user?.name ? `Hi, ${user.name}!` : user?.email ? `Hi, ${user.email.split('@')[0]}!` : session?.user?.email ? `Hi, ${session.user.email.split('@')[0]}!` : 'Your profile'}
                </span>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={() => {
                openAuthModal('login');
                setMobileMenuOpen(false);
              }}
            >
              Login / Join
            </button>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

