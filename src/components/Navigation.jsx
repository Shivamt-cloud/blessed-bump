import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Debug: Log user state changes
  React.useEffect(() => {
    console.log('Navigation - User state changed:', { 
      hasUser: !!user, 
      userName: user?.name, 
      userEmail: user?.email,
      loading 
    });
  }, [user, loading]);

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
          <Logo size={40} />
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
          {loading ? (
            <div className="nav-loading" style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              color: 'rgba(44, 32, 87, 0.6)'
            }}>
              Loading...
            </div>
          ) : user ? (
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
                {user.avatar ? (
                  <span className="user-avatar" aria-hidden>
                    <img src={user.avatar} alt={`${user.name || 'User'} avatar`} />
                  </span>
                ) : (
                  <span className="user-avatar placeholder" aria-hidden>
                    {(user.name || user.email || 'M').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="user-name-text">
                  {user.name ? `Hi, ${user.name}!` : user.email ? `Hi, ${user.email.split('@')[0]}!` : 'Your profile'}
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

