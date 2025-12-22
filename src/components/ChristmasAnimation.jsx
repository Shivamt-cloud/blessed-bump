import React, { useState, useEffect } from 'react';
import './ChristmasAnimation.css';

const ChristmasAnimation = () => {
  const [isHolidaySeason, setIsHolidaySeason] = useState(false);
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const checkHolidaySeason = () => {
      // Check for test mode (for development/testing)
      const urlParams = new URLSearchParams(window.location.search);
      const christmasMode = localStorage.getItem('christmasTestMode') === 'true' || 
                           urlParams.get('christmas') === 'true';
      const newYearMode = localStorage.getItem('newYearTestMode') === 'true' || 
                         urlParams.get('newyear') === 'true' ||
                         urlParams.get('new-year') === 'true';

      if (christmasMode || newYearMode) {
        setIsHolidaySeason(true);
        // Enable New Year features if New Year mode is explicitly enabled
        if (newYearMode) {
          setIsNewYear(true);
        } else if (christmasMode) {
          setIsNewYear(true); // Also enable New Year in Christmas test mode
        }
        return;
      }

      const now = new Date();
      const month = now.getMonth() + 1; // 1-12
      const day = now.getDate();

      // Christmas season: December 1 - January 7
      const isChristmasSeason = 
        (month === 12 && day >= 1) || 
        (month === 1 && day <= 7);

      // New Year: December 31 - January 7
      const isNewYearSeason = 
        (month === 12 && day === 31) || 
        (month === 1 && day <= 7);

      setIsHolidaySeason(isChristmasSeason);
      setIsNewYear(isNewYearSeason);
    };

    checkHolidaySeason();
    // Check daily to update the season
    const interval = setInterval(checkHolidaySeason, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (!isHolidaySeason) return null;

  // Generate snowflakes - larger sizes with colors
  const snowflakeColors = ['#87CEEB', '#B0E0E6', '#ADD8E6', '#E0F6FF', '#AFEEEE']; // Various shades of blue/cyan
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    fontSize: Math.random() * 30 + 25, // Font size in px: 25-55px for larger snowflakes
    color: snowflakeColors[Math.floor(Math.random() * snowflakeColors.length)], // Random color from array
  }));

  return (
    <div className="christmas-animation-container">
      {/* Falling Snow */}
      <div className="snow-container">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              fontSize: `${flake.fontSize}px`,
              color: flake.color, // Apply random color
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Dancing Santa - Emoji */}
      <div className="santa-container">
        <div className="santa-emoji">🎅</div>
      </div>

      {/* Reindeer 1 - Emoji */}
      <div className="reindeer-container reindeer-1">
        <div className="reindeer-emoji">🦌</div>
      </div>

      {/* Reindeer 2 - Emoji */}
      <div className="reindeer-container reindeer-2">
        <div className="reindeer-emoji">🦌</div>
      </div>

      {/* Celebration Confetti for New Year */}
      {isNewYear && (
        <div className="confetti-container">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'][
                  Math.floor(Math.random() * 5)
                ],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChristmasAnimation;

