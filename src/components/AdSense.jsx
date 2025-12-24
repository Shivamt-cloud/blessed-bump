import React, { useEffect } from 'react';
import './AdSense.css';

/**
 * AdSense Component for Google AdSense ads
 * 
 * Usage:
 * <AdSense 
 *   adSlot="1234567890" 
 *   adFormat="auto" 
 *   fullWidthResponsive={true} 
 * />
 * 
 * Or for auto ads (no adSlot needed):
 * <AdSense adFormat="auto" fullWidthResponsive={true} />
 */
function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = '',
  adClient = 'ca-pub-7327960019798694'
}) {
  useEffect(() => {
    try {
      // Push ad request to Google AdSense
      if (window.adsbygoogle && window.adsbygoogle.loaded !== true) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // If no adSlot is provided, this is for auto ads (just a placeholder)
  if (!adSlot) {
    return (
      <div 
        className={`adsense-container ${className}`}
        style={{ 
          minHeight: '100px', 
          width: '100%',
          ...style 
        }}
      >
        {/* Auto ads will be injected here by Google */}
      </div>
    );
  }

  // Manual ad unit
  return (
    <div 
      className={`adsense-container ${className}`}
      style={{ 
        display: 'block',
        textAlign: 'center',
        minHeight: '100px',
        ...style 
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdSense;

