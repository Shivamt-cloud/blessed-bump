import React from 'react';
import './Community.css';

function Community() {
  return (
    <div className="community-page">
      <div className="community-container">
        <div className="community-header">
          <h1>Community</h1>
          <p>Connect with other expecting and new parents</p>
        </div>

        <div className="coming-soon">
          <div className="coming-soon-content">
            <h2>🚀 Coming Soon!</h2>
            <p>We're building an amazing community platform for you.</p>
            <div className="features-preview">
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <div>
                  <h3>Discussion Forums</h3>
                  <p>Ask questions and share experiences</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <div>
                  <h3>Connect with Parents</h3>
                  <p>Meet others in the same stage</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div>
                  <h3>Polls & Surveys</h3>
                  <p>Share your opinions and experiences</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💡</span>
                <div>
                  <h3>Expert Advice</h3>
                  <p>Get tips from healthcare professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;

