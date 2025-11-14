import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPage.css';

function PlaceholderPage({ title, description, comingSoon = true }) {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>{title}</h1>
        {comingSoon && (
          <div style={{
            background: 'linear-gradient(135deg, #ff9ac2 0%, #e91e63 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>🚀 Coming Soon!</h2>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.95 }}>
              We're working hard to bring you this feature. Check back soon!
            </p>
          </div>
        )}
        <section>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            {description}
          </p>
        </section>
        <section>
          <h2>What You Can Do Now</h2>
          <ul>
            <li>Explore our <Link to="/dashboard">GlowBoard</Link> for pregnancy tracking</li>
            <li>Use our <Link to="/calculator">Due-Date Oracle</Link> to calculate your due date</li>
            <li>Check out our <Link to="/fertility">Fertility Oracle</Link> for cycle tracking</li>
            <li>Join our <Link to="/community">Village Voice</Link> community</li>
            <li><Link to="/contact">Contact us</Link> if you have questions</li>
          </ul>
        </section>
        <section>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #7c72ff 0%, #ff9fb8 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              marginTop: '1rem'
            }}
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </div>
  );
}

export default PlaceholderPage;

