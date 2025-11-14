import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import './ComingSoon.css';

function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (1 week from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 7);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: '📅',
      title: 'Due-Date Oracle',
      description: 'Calculate your due date with precision and get personalized timeline information.',
    },
    {
      icon: '📊',
      title: 'GlowBoard Dashboard',
      description: 'Track your daily progress with personalized insights and wellness metrics.',
    },
    {
      icon: '🌱',
      title: 'Journey Keeper',
      description: 'Follow your pregnancy week-by-week with detailed baby development insights.',
    },
    {
      icon: '🌸',
      title: 'Fertility Oracle',
      description: 'Track ovulation, identify fertile windows, and maximize your chances of conception.',
    },
    {
      icon: '💬',
      title: 'Village Voice',
      description: 'Connect with a supportive community of expecting parents and share experiences.',
    },
    {
      icon: '📈',
      title: 'Daily Wellness Tracking',
      description: 'Monitor energy levels, movement, cravings, and more with interactive tools.',
    },
  ];

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        {/* Header */}
        <header className="coming-soon-header">
          <Logo size={60} />
          <h1 className="coming-soon-title">BlessedBump</h1>
          <p className="coming-soon-subtitle">Your Journey, Your Glow, Your Village</p>
        </header>

        {/* Main Content */}
        <main className="coming-soon-main">
          {/* Countdown Section */}
          <section className="countdown-section">
            <h2 className="countdown-title">We're Launching Soon!</h2>
            <p className="countdown-subtitle">Get ready for your complete pregnancy companion</p>
            
            <div className="countdown-timer">
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.days}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>

            <p className="launch-date">Launch Date: {launchDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </section>

          {/* About Section */}
          <section className="about-section">
            <h2 className="section-title">What is BlessedBump?</h2>
            <p className="about-description">
              BlessedBump is your complete pregnancy companion, designed to support you from the moment 
              you start trying to conceive through delivery and beyond. Our comprehensive platform combines 
              accurate tracking, personalized insights, and a supportive community to make your pregnancy 
              journey simple, informed, and enjoyable.
            </p>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h2 className="section-title">What You'll Get</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="benefits-section">
            <h2 className="section-title">Why Choose BlessedBump?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Accurate due date calculations and pregnancy tracking</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Personalized insights tailored to your exact pregnancy stage</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Week-by-week baby development information</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Fertility and ovulation tracking for conception planning</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Daily wellness monitoring and progress tracking</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Supportive community of expecting parents</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Beautiful, intuitive interface designed for expecting parents</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Completely free to join and use</span>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="newsletter-section">
            <h2 className="section-title">Be the First to Know</h2>
            <p className="newsletter-description">
              Get notified when we launch! Enter your email and we'll send you an exclusive invitation.
            </p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              alert(`Thank you! We'll notify ${email} when we launch.`);
              e.target.reset();
            }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Notify Me
              </button>
            </form>
          </section>

          {/* Social Section */}
          <section className="social-section">
            <h2 className="section-title">Stay Connected</h2>
            <p className="social-description">
              Follow us for updates, tips, and community highlights
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span>📘</span> Facebook
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span>📷</span> Instagram
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span> Twitter
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="coming-soon-footer">
          <p>&copy; {new Date().getFullYear()} BlessedBump. All rights reserved.</p>
          <p className="footer-tagline">Nurturing Life, One Week at a Time</p>
        </footer>
      </div>
    </div>
  );
}

export default ComingSoon;

