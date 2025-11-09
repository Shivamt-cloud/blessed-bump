import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateCurrentWeek, getBabySize, getTrimester, getWeeklyMilestone } from '../utils/pregnancyCalculator';
import BabyExpress from '../components/BabyExpress';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [pregnancyData, setPregnancyData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);

  useEffect(() => {
    // Get pregnancy data from localStorage
    const savedData = localStorage.getItem('blessedbump_pregnancy_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPregnancyData(data);
      if (data.dueDate) {
        const weekData = calculateCurrentWeek(data.dueDate);
        setCurrentWeek(weekData);
      }
    }
  }, []);

  const babyInfo = currentWeek ? getBabySize(currentWeek.weeks) : null;
  const trimester = currentWeek ? getTrimester(currentWeek.weeks) : null;
  const milestone = currentWeek ? getWeeklyMilestone(currentWeek.weeks) : null;

  const produceEmojiMap = {
    'poppy seed': '🌸',
    'sesame seed': '🌱',
    lentil: '🫘',
    blueberry: '🫐',
    'kidney bean': '🫘',
    grape: '🍇',
    kumquat: '🍊',
    fig: '🌰',
    lime: '🍋',
    peach: '🍑',
    lemon: '🍋',
    apple: '🍎',
    avocado: '🥑',
    pear: '🍐',
    'sweet potato': '🍠',
    mango: '🥭',
    banana: '🍌',
    carrot: '🥕',
    papaya: '🥭',
    grapefruit: '🍊',
    corn: '🌽',
    cauliflower: '🥦',
    'butternut squash': '🎃',
    'head of lettuce': '🥬',
    eggplant: '🍆',
    cabbage: '🥬',
    coconut: '🥥',
    squash: '🎃',
    pineapple: '🍍',
    cantaloupe: '🍈',
    'honeydew melon': '🍈',
    'romaine lettuce': '🥬',
    'swiss chard': '🥬',
    leek: '🧅',
    'mini watermelon': '🍉',
    'small pumpkin': '🎃',
    'growing baby': '👶',
  };

  const totalDaysPregnant = currentWeek ? currentWeek.weeks * 7 + currentWeek.days : 0;
  const daysToGo = Math.max(280 - totalDaysPregnant, 0);
  const progressPercent = Math.min(Math.round((totalDaysPregnant / 280) * 100), 100);

  const babyLengthCm =
    babyInfo && babyInfo.length && !Number.isNaN(parseFloat(babyInfo.length))
      ? parseFloat(babyInfo.length)
      : null;
  const babyWeightGr =
    babyInfo && babyInfo.weight && !Number.isNaN(parseFloat(babyInfo.weight))
      ? parseFloat(babyInfo.weight)
      : null;

  const visualSize = babyLengthCm ? Math.min(Math.max(babyLengthCm / 4, 2.5), 9.5) : 4;
  const produceEmoji =
    babyInfo && babyInfo.size
      ? produceEmojiMap[babyInfo.size.toLowerCase()] || '👶'
      : '👶';

  const babyVoiceMessage = babyInfo
    ? `Look Mumma, I'm as big as a ${babyInfo.size.toLowerCase()}!`
    : `I'm growing happily here!`;

  const babyVoiceDetail =
    babyLengthCm && babyWeightGr
      ? `I’m roughly ${babyInfo.length} cm long and weigh about ${babyInfo.weight} g.`
      : `Thanks for checking on me today.`;

  const hydrationPercent = Math.min(
    100,
    55 + ((currentWeek?.weeks || 0) % 5) * 9 + (currentWeek?.days || 0)
  );
  const sleepHours = 7 + ((currentWeek?.days || 0) % 3) * 0.5;
  const moodStates = ['Radiant', 'Calm', 'Empowered', 'Restful', 'Grateful'];
  const moodStatus = moodStates[currentWeek ? currentWeek.weeks % moodStates.length : 0];
  const movementSessions = 3 + ((currentWeek?.days || 0) % 3);
  const movementGoal = 5;

  const journeyMetrics = [
    {
      label: 'Hydration',
      percent: hydrationPercent,
      detail: `${Math.min(8, Math.round(hydrationPercent / 12))}/8 cups`,
      icon: '💧',
    },
    {
      label: 'Sleep',
      percent: Math.min(100, Math.round((sleepHours / 8) * 100)),
      detail: `${sleepHours.toFixed(1)} hrs`,
      icon: '😴',
    },
    {
      label: 'Mood',
      percent: 100,
      detail: moodStatus,
      icon: '🌈',
    },
    {
      label: 'Movement',
      percent: Math.min(100, Math.round((movementSessions / movementGoal) * 100)),
      detail: `${movementSessions}/${movementGoal} sessions`,
      icon: '🧘‍♀️',
    },
  ];

  const affirmations = [
    'Your body is doing an incredible job—take a moment to breathe and smile.',
    'You are the perfect home for your little miracle today.',
    'Every kick and flutter is a love note just for you.',
    'Rest when you can; nourishment grows miracles.',
    'Your intuition is powerful—trust the rhythm you and baby share.',
  ];

  const wellnessTips = [
    'Sip infused water with citrus or mint to stay hydrated.',
    'Do gentle stretches or prenatal yoga for a calming reset.',
    'Snack on protein + fiber to keep energy steady.',
    'Take five slow belly breaths to connect with baby.',
    'Write a quick note to baby—today’s feeling, a wish, or a joy.',
    'Ask for help with one task; you deserve the support.',
    'Step outside for fresh air and sunlight, even if just for a minute.',
  ];

  const affirmation =
    affirmations[currentWeek ? currentWeek.weeks % affirmations.length : 0];
  const wellnessTip =
    wellnessTips[currentWeek ? currentWeek.weeks % wellnessTips.length : 0];

  const checkInMetrics = [
    {
      label: 'Energy',
      icon: '⚡️',
      level:
        ['Gentle', 'Steady', 'Bright', 'Peaceful'][
          currentWeek ? currentWeek.days % 4 : 0
        ],
      percent: 65 + ((currentWeek?.days || 0) % 4) * 8,
    },
    {
      label: 'Movement',
      icon: '🚶‍♀️',
      level: `${movementSessions} of ${movementGoal} sessions`,
      percent: Math.min(100, Math.round((movementSessions / movementGoal) * 100)),
    },
    {
      label: 'Cravings',
      icon: '🍓',
      level:
        ['Sweet berries', 'Crunchy veggies', 'Comfort soup', 'Citrus splash'][
          currentWeek ? currentWeek.weeks % 4 : 0
        ],
      percent: 50 + ((currentWeek?.weeks || 0) % 5) * 9,
    },
  ];

  const focusActions = [
    {
      title: 'Celebrate Baby Movements',
      description: 'Jot down today’s kicks or flutters to notice patterns.',
      icon: '🦶',
      to: '/tracker',
      tone: 'rose',
    },
    {
      title: 'Refresh Due Date',
      description: 'Update your due date if you’ve had new doctor insights.',
      icon: '📅',
      to: '/calculator',
      tone: 'sun',
    },
    {
      title: 'Connect With Community',
      description: 'Share how you’re feeling and get warmth back.',
      icon: '💬',
      to: '/community',
      tone: 'lavender',
    },
    {
      title: 'Hydration Check',
      description: 'Take a mindful sip—your baby loves the flow of nutrients.',
      icon: '💧',
      to: '/tracker',
      tone: 'aqua',
    },
  ];

  const featuredAction = {
    title: 'Take a Love Note Moment',
    message:
      'Write a tiny message to baby—what made you smile today? Save it to revisit later.',
    cta: 'Open Journal',
    icon: '📝',
    to: '/tracker',
  };

  const nourishCategories = [
    {
      title: 'Nutrition',
      icon: '🥗',
      points: [
        'Add a handful of leafy greens for extra folate.',
        'Pair fruit with protein to keep energy steady.',
        'Plan tomorrow’s breakfast before bed for a calm start.',
      ],
    },
    {
      title: 'Body',
      icon: '🧡',
      points: [
        'Stretch your shoulders and hips for two soothing minutes.',
        'Schedule a belly-breathing pause after lunch.',
        'Prop your feet up and practice ankle rotations.',
      ],
    },
    {
      title: 'Connection',
      icon: '🌙',
      points: [
        'Share a highlight with your partner or support friend.',
        'Play a song that makes you feel close to baby.',
        'Capture a bump photo—it’s magic in progress.',
      ],
    },
  ];

  const dueDate = pregnancyData?.dueDate ? new Date(pregnancyData.dueDate) : null;
  const formattedDueDate = dueDate
    ? dueDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  if (!pregnancyData || !currentWeek) {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <div className="empty-content">
            <h2>Welcome to BlessedBump, {user?.name}! 👶</h2>
            <p>Get started by calculating your due date</p>
            <Link to="/calculator" className="btn-primary">
              Calculate Due Date
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hey wonder-mom, {user?.name}! ✨</h1>
        <p className="subtitle">Your BlessedBump storyline is unfolding beautifully—here’s today’s chapter.</p>
      </div>

      <div className="dashboard-grid">
        {/* Main Card - Current Week */}
        <div className="card main-card">
          <div className="main-card-header">
            <div>
              <div className="week-badge">Week {currentWeek.weeks}</div>
              <div className="week-info">
                <h2>You're {currentWeek.weeks} weeks pregnant!</h2>
                {currentWeek.days > 0 && (
                  <p className="days-info">
                    {currentWeek.days} day{currentWeek.days === 1 ? '' : 's'} into week{' '}
                    {currentWeek.weeks}
                  </p>
                )}
              </div>
            </div>
            <div className="trimester-chip">Trimester {trimester}</div>
          </div>

          <div className="journey-progress">
            <div className="progress-label">
              <span>Journey Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="progress-meta">
              {daysToGo > 0 ? `${daysToGo} days until your due date` : 'Due date reached!'}
            </p>
          </div>

          <div className="main-card-body">
            <div className="baby-voice-card">
              <div className="baby-voice-avatar">
                <span className="baby-voice-emoji">{produceEmoji}</span>
                <span className="baby-voice-emoji-overlay">👶</span>
              </div>
              <div className="baby-voice-content">
                <p className="baby-voice-label">Baby says</p>
                <p className="baby-voice-message">{babyVoiceMessage}</p>
                <p className="baby-voice-detail">{babyVoiceDetail}</p>
              </div>
            </div>

            {babyInfo && (
              <div className="growth-visual">
                <div
                  className="growth-visual-orb"
                  style={{ width: `${visualSize}rem`, height: `${visualSize}rem` }}
                >
                  <span className="growth-visual-emoji">{produceEmoji}</span>
                </div>
                <div className="growth-details">
                  <div className="growth-stat">
                    <span className="growth-label">Length</span>
                    <span className="growth-value">
                      {babyLengthCm ? `${babyInfo.length} cm` : 'Growing'}
                    </span>
                  </div>
                  <div className="growth-stat">
                    <span className="growth-label">Weight</span>
                    <span className="growth-value">
                      {babyWeightGr ? `${babyInfo.weight} g` : 'Building'}
                    </span>
                  </div>
                  <div className="growth-stat">
                    <span className="growth-label">Trimester</span>
                    <span className="growth-value">#{trimester}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {milestone && (
            <div className="milestone">
              <p className="milestone-label">This Week's Milestone:</p>
              <p className="milestone-text">{milestone}</p>
            </div>
          )}
        </div>

        <BabyExpress
          currentWeekNumber={currentWeek.weeks}
          currentWeekDays={currentWeek.days}
          formattedDueDate={formattedDueDate}
        />

        {/* LumiMetrics */}
        <div className="card insights-card">
          <div className="insights-header">
            <div>
              <h3>LumiMetrics</h3>
              <p className="insights-subtitle">Glow markers that keep pace with your heartbeats</p>
            </div>
            <div className="insights-countdown">
              <span className="countdown-label">Due in</span>
              <span className="countdown-value">
                {daysToGo > 0 ? `${daysToGo} days` : 'Any day now!'}
              </span>
              <span className="countdown-date">{formattedDueDate}</span>
            </div>
          </div>
          <div className="insights-grid">
            <div className="insight-card primary">
              <span className="insight-icon">📅</span>
              <div>
                <p className="insight-label">Week</p>
                <p className="insight-value">{currentWeek.weeks}</p>
                <p className="insight-meta">Trimester {trimester}</p>
              </div>
            </div>

            <div className="insight-card">
              <span className="insight-icon">🌀</span>
              <div>
                <p className="insight-label">Journey Complete</p>
                <p className="insight-value">{progressPercent}%</p>
                <p className="insight-meta">Amazing progress, keep glowing</p>
              </div>
            </div>

            {journeyMetrics.map((metric) => (
              <div className="insight-card metric" key={metric.label}>
                <div
                  className="metric-ring"
                  style={{ '--progress': `${metric.percent}%` }}
                >
                  <span className="metric-ring-label">{metric.icon}</span>
                </div>
                <div className="metric-details">
                  <p className="insight-label">{metric.label}</p>
                  <p className="insight-value">{metric.detail}</p>
                  <p className="insight-meta">{metric.percent}% of goal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pocket Spark */}
        <div className="card focus-card">
          <div className="focus-header">
            <h3>Pocket Spark</h3>
            <p>A tiny mission to make today shimmer just a bit brighter</p>
          </div>

          <Link to={featuredAction.to} className="featured-action">
            <div className="featured-icon">{featuredAction.icon}</div>
            <div>
              <p className="featured-title">{featuredAction.title}</p>
              <p className="featured-message">{featuredAction.message}</p>
              <span className="featured-cta">{featuredAction.cta}</span>
            </div>
          </Link>

          <div className="focus-grid">
            {focusActions.map((action) => (
              <Link
                to={action.to}
                className={`focus-item focus-item-${action.tone}`}
                key={action.title}
              >
                <div className="focus-icon">{action.icon}</div>
                <div>
                  <p className="focus-title">{action.title}</p>
                  <p className="focus-desc">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* HeartSync */}
        <div className="card baby-you-card">
          <div className="baby-you-left">
            <div className="affirmation-header">
              <span className="affirmation-icon">💖</span>
              <div>
                <h3>HeartSync</h3>
                <p className="affirmation-subtitle">Whispers between you and your little glowbug</p>
              </div>
            </div>
            <p className="affirmation-text">{affirmation}</p>
            <div className="wellness-tip">
              <p className="wellness-tip-label">Today's Wellness Tip</p>
              <p className="wellness-tip-text">{wellnessTip}</p>
            </div>
          </div>
          <div className="baby-you-right">
            <h4>Today's Check-in</h4>
            <div className="check-in-grid">
              {checkInMetrics.map((item) => (
                <div className="check-in-card" key={item.label}>
                  <div className="check-in-header">
                    <span className="check-in-icon">{item.icon}</span>
                    <span className="check-in-label">{item.label}</span>
                  </div>
                  <p className="check-in-level">{item.level}</p>
                  <div className="check-in-meter">
                    <div
                      className="check-in-meter-fill"
                      style={{ width: `${Math.min(item.percent, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card nourish-card">
          <div className="nourish-header">
            <div>
              <h3>💡 Nourish & Thrive Atlas</h3>
              <p className="nourish-subtitle">Wrap your day with gentle rituals</p>
            </div>
            <Link to="/tracker" className="nourish-cta">
              Save to Journal →
            </Link>
          </div>
          <div className="nourish-grid">
            {nourishCategories.map((category) => (
              <div className="nourish-category" key={category.title}>
                <div className="nourish-category-header">
                  <span className="nourish-icon">{category.icon}</span>
                  <span className="nourish-title">{category.title}</span>
                </div>
                <ul className="nourish-list">
                  {category.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

