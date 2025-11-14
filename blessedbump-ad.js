/**
 * BlessedBump Advertisement Script
 * 
 * Usage:
 * 1. Include this script: <script src="blessedbump-ad.js"></script>
 * 2. Add container: <div id="blessedbump-ad"></div>
 * 3. Initialize: BlessedBumpAd.init({ container: 'blessedbump-ad' });
 * 
 * Or use auto-init: <div id="blessedbump-ad" data-auto-init="true"></div>
 */

(function(window) {
  'use strict';

  const BlessedBumpAd = {
    config: {
      websiteUrl: 'https://blessedbump.in',
      tagline: 'Your Journey, Your Glow, Your Village',
      primaryColor: '#FF9FB8',
      secondaryColor: '#7C72FF',
      container: 'blessedbump-ad',
      width: '100%',
      height: 'auto',
      minHeight: '200px',
      trackClicks: true,
      trackViews: true,
      animation: true
    },

    /**
     * Initialize the advertisement
     */
    init: function(options) {
      // Merge user options with defaults
      this.config = Object.assign({}, this.config, options || {});
      
      // Find container
      const container = document.getElementById(this.config.container);
      if (!container) {
        console.warn('BlessedBump Ad: Container not found');
        return;
      }

      // Track view
      if (this.config.trackViews) {
        this.trackEvent('view');
      }

      // Render ad
      this.render(container);

      // Auto-init for data attributes
      this.autoInit();
    },

    /**
     * Auto-initialize ads with data-auto-init attribute
     */
    autoInit: function() {
      const containers = document.querySelectorAll('[data-auto-init="true"]');
      containers.forEach(container => {
        if (!container.dataset.initialized) {
          container.dataset.initialized = 'true';
          this.config.container = container.id;
          this.render(container);
          if (this.config.trackViews) {
            this.trackEvent('view', { container: container.id });
          }
        }
      });
    },

    /**
     * Render the advertisement
     */
    render: function(container) {
      const style = this.getStyles();
      const html = this.getHTML();
      
      // Inject styles
      this.injectStyles(style);
      
      // Render HTML
      container.innerHTML = html;
      
      // Add event listeners
      this.attachEvents(container);
    },

    /**
     * Get CSS styles
     */
    getStyles: function() {
      return `
        .blessedbump-ad {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #FFEFF7 0%, #FFD6E9 50%, #F9B9D2 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(255, 159, 184, 0.3);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: ${this.config.minHeight};
        }
        .blessedbump-ad:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 159, 184, 0.4);
        }
        .blessedbump-ad-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          display: block;
          ${this.config.animation ? 'animation: logoFloat 3s ease-in-out infinite;' : ''}
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .blessedbump-ad-title {
          font-size: 24px;
          font-weight: 700;
          color: #FF6B9D;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #FF6B9D 0%, #7C72FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .blessedbump-ad-tagline {
          font-size: 14px;
          color: #666;
          margin: 0 0 16px;
          font-weight: 500;
        }
        .blessedbump-ad-features {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin: 16px 0;
        }
        .blessedbump-ad-feature {
          font-size: 12px;
          color: #888;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .blessedbump-ad-cta {
          display: inline-block;
          background: linear-gradient(135deg, ${this.config.primaryColor} 0%, ${this.config.secondaryColor} 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 24px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          margin-top: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }
        .blessedbump-ad-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
        }
        .blessedbump-ad-powered {
          font-size: 10px;
          color: #999;
          margin-top: 12px;
          opacity: 0.7;
        }
        @media (max-width: 480px) {
          .blessedbump-ad {
            padding: 16px;
          }
          .blessedbump-ad-title {
            font-size: 20px;
          }
          .blessedbump-ad-features {
            flex-direction: column;
            gap: 8px;
          }
        }
      `;
    },

    /**
     * Get HTML content
     */
    getHTML: function() {
      return `
        <div class="blessedbump-ad" onclick="BlessedBumpAd.handleClick()">
          ${this.getLogoSVG()}
          <h3 class="blessedbump-ad-title">BlessedBump</h3>
          <p class="blessedbump-ad-tagline">${this.config.tagline}</p>
          <div class="blessedbump-ad-features">
            <span class="blessedbump-ad-feature">📅 Due Date Calculator</span>
            <span class="blessedbump-ad-feature">📊 Week Tracker</span>
            <span class="blessedbump-ad-feature">💬 Community</span>
          </div>
          <a href="${this.config.websiteUrl}" class="blessedbump-ad-cta" onclick="event.stopPropagation(); BlessedBumpAd.handleClick();">
            Start Your Journey →
          </a>
          <div class="blessedbump-ad-powered">Powered by BlessedBump</div>
        </div>
      `;
    },

    /**
     * Get logo SVG
     */
    getLogoSVG: function() {
      return `
        <svg class="blessedbump-ad-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="adAuraGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#FFEFF7" />
              <stop offset="60%" stop-color="#FFD6E9" />
              <stop offset="100%" stop-color="#F9B9D2" />
            </radialGradient>
            <radialGradient id="adBumpGradient" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stop-color="#FFD9E8" />
              <stop offset="55%" stop-color="#FF9DBF" />
              <stop offset="100%" stop-color="#FF78A8" />
            </radialGradient>
            <radialGradient id="adBabyHeadGradient" cx="45%" cy="45%" r="70%">
              <stop offset="0%" stop-color="#FFEDE2" />
              <stop offset="100%" stop-color="#FFC9AE" />
            </radialGradient>
            <radialGradient id="adBabyBodyGradient" cx="50%" cy="60%" r="75%">
              <stop offset="0%" stop-color="#FFF3E8" />
              <stop offset="100%" stop-color="#FFD8BF" />
            </radialGradient>
            <radialGradient id="adMotherSkinGradient" cx="50%" cy="35%" r="80%">
              <stop offset="0%" stop-color="#FFE6EF" />
              <stop offset="100%" stop-color="#FF9FBD" />
            </radialGradient>
            <linearGradient id="adHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF8AAF" />
              <stop offset="100%" stop-color="#FF4D88" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#adAuraGradient)" />
          <ellipse cx="50" cy="65" rx="35" ry="25" fill="url(#adBumpGradient)" stroke="#FF91B0" stroke-width="2.2" />
          <circle cx="45" cy="50" r="12" fill="url(#adBabyHeadGradient)" stroke="#F9B9A2" stroke-width="1.4" />
          <ellipse cx="45" cy="65" rx="10" ry="15" fill="url(#adBabyBodyGradient)" stroke="#FFCFB2" stroke-width="1.2" />
          <circle cx="41" cy="48" r="1.5" fill="#333" />
          <circle cx="49" cy="48" r="1.5" fill="#333" />
          <path d="M 41 52 Q 45 55 49 52" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="50" cy="25" r="12" fill="url(#adMotherSkinGradient)" stroke="#FF91B0" stroke-width="2" />
          <circle cx="46" cy="23" r="1" fill="#666" />
          <circle cx="54" cy="23" r="1" fill="#666" />
          <path d="M 46 28 Q 50 31 54 28" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 38 20 Q 50 8 62 20 Q 58 17 50 17 Q 42 17 38 20 Z" fill="#FF8EB9" opacity="0.75" />
          <path d="M 15 25 Q 10 40 25 55" fill="none" stroke="#FFB6C6" stroke-width="4" stroke-linecap="round" />
          <path d="M 85 25 Q 90 40 75 55" fill="none" stroke="#FFB6C6" stroke-width="4" stroke-linecap="round" />
          <path d="M 58 55 L 60 52 L 62 55 L 64 57 Q 64 59 62 61 Q 60 63 58 65 Q 56 63 54 61 Q 52 59 52 57 Z" fill="url(#adHeartGradient)" />
        </svg>
      `;
    },

    /**
     * Inject CSS styles
     */
    injectStyles: function(css) {
      const styleId = 'blessedbump-ad-styles';
      let style = document.getElementById(styleId);
      
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      }
      
      style.textContent = css;
    },

    /**
     * Attach event listeners
     */
    attachEvents: function(container) {
      const adElement = container.querySelector('.blessedbump-ad');
      if (adElement) {
        adElement.addEventListener('click', this.handleClick.bind(this));
      }
    },

    /**
     * Handle click event
     */
    handleClick: function(event) {
      if (this.config.trackClicks) {
        this.trackEvent('click');
      }
      
      // Open website in new tab
      window.open(this.config.websiteUrl, '_blank', 'noopener,noreferrer');
      
      if (event) {
        event.preventDefault();
      }
    },

    /**
     * Track events (analytics)
     */
    trackEvent: function(eventType, data) {
      const eventData = {
        event: 'blessedbump_ad_' + eventType,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        ...data
      };

      // Log to console (for debugging)
      if (window.console && console.log) {
        console.log('BlessedBump Ad Event:', eventData);
      }

      // Send to analytics (if available)
      if (window.gtag) {
        window.gtag('event', eventData.event, {
          event_category: 'advertisement',
          event_label: eventData.url
        });
      }

      // Send to custom analytics endpoint (if configured)
      if (this.config.analyticsEndpoint) {
        this.sendAnalytics(eventData);
      }
    },

    /**
     * Send analytics data to server
     */
    sendAnalytics: function(data) {
      if (typeof fetch !== 'undefined') {
        fetch(this.config.analyticsEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).catch(err => {
          console.warn('BlessedBump Ad: Analytics error', err);
        });
      }
    }
  };

  // Expose to global scope
  window.BlessedBumpAd = BlessedBumpAd;

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      BlessedBumpAd.autoInit();
    });
  } else {
    BlessedBumpAd.autoInit();
  }

})(window);

