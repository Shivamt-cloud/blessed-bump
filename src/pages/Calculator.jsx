import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  calculateDueDate, 
  calculateConceptionDate, 
  calculateCurrentWeek,
  calculateOvulationWindow,
  checkDateInFertileWindow,
  getConceptionProbability
} from '../utils/pregnancyCalculator';
import { format, addDays, differenceInDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import './Calculator.css';

function Calculator() {
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState('dueDate'); // 'dueDate' or 'fertility'
  
  // Due Date Calculator states
  const [lmpDate, setLmpDate] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [conceptionDate, setConceptionDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [saved, setSaved] = useState(false);
  
  // Fertility Calculator states
  const [fertilityLmpDate, setFertilityLmpDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [intercourseDate, setIntercourseDate] = useState('');
  const [fertilityWindow, setFertilityWindow] = useState(null);
  const [isInFertileWindow, setIsInFertileWindow] = useState(false);
  const [conceptionProb, setConceptionProb] = useState(null);

  useEffect(() => {
    // Load saved data if exists
    const savedData = localStorage.getItem('blessedbump_pregnancy_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.lmpDate) {
        setLmpDate(data.lmpDate);
        calculateDates(data.lmpDate);
      }
    }
  }, []);

  const calculateDates = (lmp) => {
    if (!lmp) return;

    const calculatedDueDate = calculateDueDate(lmp);
    const calculatedConception = calculateConceptionDate(calculatedDueDate);
    const weekData = calculateCurrentWeek(calculatedDueDate);

    setDueDate(calculatedDueDate);
    setConceptionDate(calculatedConception);
    setCurrentWeek(weekData);
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateDates(lmpDate);
  };

  const handleSave = () => {
    if (!user) {
      openAuthModal('login', '/dashboard');
      return;
    }

    const pregnancyData = {
      lmpDate,
      dueDate: dueDate?.toISOString(),
      conceptionDate: conceptionDate?.toISOString(),
      currentWeek: currentWeek?.weeks,
    };

    localStorage.setItem('blessedbump_pregnancy_data', JSON.stringify(pregnancyData));
    setSaved(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  // Fertility Calculator functions
  const calculateFertilityDates = (lmp, cycle) => {
    if (!lmp || !cycle) {
      setFertilityWindow(null);
      setIsInFertileWindow(false);
      setConceptionProb(null);
      return;
    }

    const window = calculateOvulationWindow(lmp, cycle);
    setFertilityWindow(window);

    if (intercourseDate) {
      const inWindow = checkDateInFertileWindow(intercourseDate, lmp, cycle);
      const probability = getConceptionProbability(intercourseDate, lmp, cycle);
      setIsInFertileWindow(inWindow);
      setConceptionProb(probability);
    }
  };

  const handleFertilitySubmit = (e) => {
    e.preventDefault();
    calculateFertilityDates(fertilityLmpDate, cycleLength);
  };

  const handleIntercourseDateChange = (date) => {
    setIntercourseDate(date);
    if (fertilityLmpDate && cycleLength) {
      const inWindow = checkDateInFertileWindow(date, fertilityLmpDate, cycleLength);
      const probability = getConceptionProbability(date, fertilityLmpDate, cycleLength);
      setIsInFertileWindow(inWindow);
      setConceptionProb(probability);
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-hero">
          <div className="hero-copy">
            <p className="hero-kicker">Due Date Oracle ✨</p>
            <h1>Map your baby’s arrival & nurture your fertility rhythm</h1>
            <p>
              Unlock a personalised pregnancy timeline or pinpoint the brightest days in your fertility cycle.
              Save your calculations to weave them through the rest of your Blessed Bump journey.
            </p>
            <div className="hero-highlights">
              <span>🔮 Personalised milestones</span>
              <span>🌙 Fertility insight radar</span>
              <span>📆 Sync with your GlowBoard</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbital">
              <div className="orbital-core">
                <span role="img" aria-label="Pregnancy glow">🌈</span>
              </div>
              <div className="orbital-ring" />
              <div className="orbital-stars">
                <span>✶</span>
                <span>✷</span>
                <span>✺</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="calculator-tabs">
          <button
            className={`tab-btn ${activeTab === 'dueDate' ? 'active' : ''}`}
            onClick={() => setActiveTab('dueDate')}
          >
            📅 Due Date Calculator
          </button>
          <button
            className={`tab-btn ${activeTab === 'fertility' ? 'active' : ''}`}
            onClick={() => setActiveTab('fertility')}
          >
            🌸 Fertility & Ovulation
          </button>
        </div>

        {/* Due Date Calculator */}
        {activeTab === 'dueDate' && (
          <>
            <form onSubmit={handleSubmit} className="calculator-form">
          <div className="form-group">
            <label htmlFor="lmp">Last Menstrual Period (LMP) Date</label>
            <input
              type="date"
              id="lmp"
              value={lmpDate}
              onChange={(e) => {
                setLmpDate(e.target.value);
                calculateDates(e.target.value);
              }}
              required
            />
            <p className="form-help">
              Enter the first day of your last menstrual period
            </p>
          </div>

          <button type="submit" className="btn-calculate">
            Calculate
          </button>
        </form>

        {dueDate && currentWeek && (() => {
          const daysPassed = currentWeek.weeks * 7 + currentWeek.days;
          const totalDays = 280;
          const daysRemaining = Math.max(totalDays - daysPassed, 0);
          const progressPercent = Math.min(Math.round((daysPassed / totalDays) * 100), 100);

          const lmp = new Date(lmpDate);
          const milestoneBlueprint = [
            { label: 'Trimester One', offset: 0, description: 'Nestling in & first appointments.' },
            { label: 'Trimester Two', offset: 91, description: 'Anatomy scan, fluttering kicks, energy lift.' },
            { label: 'Trimester Three', offset: 182, description: 'Birth plan crafting & nursery glow-up.' },
            { label: 'Due Date Glow', offset: 280, description: 'Pack the bag & prepare for cuddles.' },
          ];

          const milestones = milestoneBlueprint.map((item, index) => {
            const milestoneDate = addDays(lmp, item.offset);
            const nextOffset = milestoneBlueprint[index + 1]?.offset ?? 280;
            const isReached = daysPassed >= item.offset;
            const isCurrent = daysPassed >= item.offset && daysPassed < nextOffset;

            return {
              ...item,
              dateLabel: format(milestoneDate, 'MMM d, yyyy'),
              isReached,
              isCurrent,
            };
          });

          const nextMilestone = milestones.find((m) => !m.isReached) ?? milestones[milestones.length - 1];
          const currentMilestone = milestones.find((m) => m.isCurrent) ?? nextMilestone;

          return (
            <div className="results-grid">
              <section className="summary-card">
                <header className="summary-header">
                  <h2>Baby’s Lunar Timeline</h2>
                  <span className="summary-kicker">Anchored to your LMP · {format(lmp, 'MMM d, yyyy')}</span>
                </header>

                <div className="summary-stat-group">
                  <article className="summary-stat">
                    <p className="stat-label">Expected due date</p>
                    <p className="stat-value">{format(dueDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="stat-help">Calculated at 40 weeks from LMP</p>
                  </article>
                  <article className="summary-stat">
                    <p className="stat-label">Current week</p>
                    <p className="stat-value">Week {currentWeek.weeks}</p>
                    <p className="stat-help">
                      {currentWeek.days > 0
                        ? `${currentWeek.days} days into week ${currentWeek.weeks}`
                        : 'Freshly into this new week'}
                    </p>
                  </article>
                  <article className="summary-stat">
                    <p className="stat-label">Estimated conception</p>
                    <p className="stat-value">{format(conceptionDate, 'MMM d, yyyy')}</p>
                    <p className="stat-help">Ovulation & fertilisation window</p>
                  </article>
                </div>

                <div className="progress-card">
                  <div className="progress-visual">
                    <svg viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="oracleProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff9fb8" />
                          <stop offset="100%" stopColor="#7c72ff" />
                        </linearGradient>
                      </defs>
                      <circle className="progress-track" cx="60" cy="60" r="54" />
                      <circle
                        className="progress-path"
                        cx="60"
                        cy="60"
                        r="54"
                        strokeDasharray={`${progressPercent * 3.39} 999`}
                      />
                      <text className="progress-primary" x="60" y="55" textAnchor="middle">
                        {progressPercent}%
                      </text>
                      <text className="progress-secondary" x="60" y="75" textAnchor="middle">
                        complete
                      </text>
                    </svg>
                  </div>
                  <div className="progress-copy">
                    <h3>You’re {progressPercent}% of the way there</h3>
                    <p>
                      {daysRemaining} days remain before your little one’s debut. Right now baby is immersed in the{' '}
                      <strong>{currentMilestone.label.toLowerCase()}</strong> chapter.
                    </p>
                    <div className="progress-pills">
                      <span>{daysPassed} days celebrated</span>
                      <span>{daysRemaining} days to go</span>
                    </div>
                  </div>
                </div>

                <div className="action-row">
                  <button type="button" onClick={handleSave} className="btn-save">
                    Save & sync with GlowBoard
                  </button>
                  {saved && <span className="save-message">✅ Saved! Redirecting to your dashboard…</span>}
                </div>
              </section>

              <section className="timeline-card">
                <header className="timeline-header">
                  <h3>Milestone orbit</h3>
                  <p>
                    Next highlight: <strong>{nextMilestone.label}</strong> · {nextMilestone.dateLabel}
                  </p>
                </header>
                <ol className="timeline-list">
                  {milestones.map((milestone) => (
                    <li
                      key={milestone.label}
                      className={`timeline-item ${milestone.isReached ? 'reached' : ''} ${
                        milestone.isCurrent ? 'current' : ''
                      }`}
                    >
                      <div className="timeline-bullet" />
                      <div className="timeline-content">
                        <div className="timeline-heading">
                          <h4>{milestone.label}</h4>
                          <span>{milestone.dateLabel}</span>
                        </div>
                        <p>{milestone.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          );
        })()}

            <div className="info-section">
              <h3>💡 How it works</h3>
              <ul>
                <li>The due date is calculated by adding 280 days (40 weeks) to your LMP date</li>
                <li>This is based on the standard 40-week pregnancy timeline</li>
                <li>Your actual due date may vary - consult with your healthcare provider</li>
                <li>You can update your due date anytime if you receive a different date from your doctor</li>
              </ul>
            </div>
          </>
        )}

        {/* Fertility & Ovulation Calculator */}
        {activeTab === 'fertility' && (
          <>
            <form onSubmit={handleFertilitySubmit} className="calculator-form">
              <div className="form-group">
                <label htmlFor="fertility-lmp">Last Menstrual Period (LMP) Date</label>
                <input
                  type="date"
                  id="fertility-lmp"
                  value={fertilityLmpDate}
                  onChange={(e) => {
                    setFertilityLmpDate(e.target.value);
                    calculateFertilityDates(e.target.value, cycleLength);
                  }}
                  required
                />
                <p className="form-help">
                  Enter the first day of your last menstrual period
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="cycle-length">Average Cycle Length (days)</label>
                <input
                  type="number"
                  id="cycle-length"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => {
                    setCycleLength(parseInt(e.target.value) || 28);
                    calculateFertilityDates(fertilityLmpDate, parseInt(e.target.value) || 28);
                  }}
                  required
                />
                <p className="form-help">
                  Most cycles are between 21-35 days (default: 28 days)
                </p>
              </div>

              <button type="submit" className="btn-calculate">
                Calculate Fertility Window
              </button>
            </form>

            {fertilityWindow && (() => {
              const fertileRange = `${format(fertilityWindow.fertileStart, 'MMM d')} – ${format(
                fertilityWindow.fertileEnd,
                'MMM d, yyyy'
              )}`;
              const cycleSegments = [
                {
                  label: 'Follicular flow',
                  days: cycleLength - 14,
                  descriptor: 'Hormones prime the egg & uterine lining.',
                },
                { label: 'Ovulation spark', days: 1, descriptor: 'Egg released & ready for fertilisation.' },
                {
                  label: 'Luteal nesting',
                  days: 14,
                  descriptor: 'Body prepares for implantation or a new cycle.',
                },
              ];

              return (
                <div className="fertility-layout">
                  <section className="fertility-summary">
                    <header className="summary-header">
                      <h2>Cycle brilliance</h2>
                      <span className="summary-kicker">
                        Ovulation forecast · {format(fertilityWindow.ovulationDate, 'EEEE, MMM d, yyyy')}
                      </span>
                    </header>
                    <div className="summary-stat-group">
                      <article className="summary-stat">
                        <p className="stat-label">Fertile window</p>
                        <p className="stat-value">{fertileRange}</p>
                        <p className="stat-help">6-day sweet spot for conception</p>
                      </article>
                      <article className="summary-stat">
                        <p className="stat-label">Peak fertility days</p>
                        <p className="stat-value">
                          {format(fertilityWindow.peakDays.day4, 'MMM d')} –{' '}
                          {format(fertilityWindow.ovulationDate, 'MMM d')}
                        </p>
                        <p className="stat-help">Aim for 2 days before ovulation through ovulation day</p>
                      </article>
                      <article className="summary-stat">
                        <p className="stat-label">Next period</p>
                        <p className="stat-value">{format(fertilityWindow.nextPeriod, 'EEE, MMM d')}</p>
                        <p className="stat-help">Based on a {cycleLength}-day cycle</p>
                      </article>
                    </div>
                    <div className="cycle-bar">
                      {cycleSegments.map((segment) => (
                        <div
                          key={segment.label}
                          className="cycle-segment"
                          style={{ flex: segment.days }}
                        >
                          <span>{segment.label}</span>
                          <small>{segment.days} {segment.days === 1 ? 'day' : 'days'}</small>
                        </div>
                      ))}
                    </div>
                    <p className="cycle-footnote">
                      Ovulation typically occurs {differenceInDays(fertilityWindow.nextPeriod, fertilityWindow.ovulationDate)} days before your next period.
                    </p>
                  </section>

                  <section className="fertility-insight">
                    <header className="timeline-header">
                      <h3>Cycle constellation</h3>
                      <p>
                        Align lifestyle, rest, and connection rituals with the phases of your cycle for deep-body wisdom.
                      </p>
                    </header>
                    <ul className="insight-stack">
                      <li>
                        <span className="insight-icon">💧</span>
                        <div>
                          <h4>Observe fertile fluid</h4>
                          <p>Egg-white cervical mucus points to the peak of your fertile window.</p>
                        </div>
                      </li>
                      <li>
                        <span className="insight-icon">🌡️</span>
                        <div>
                          <h4>Track temperature shifts</h4>
                          <p>A basal body temperature rise confirms ovulation has taken place.</p>
                        </div>
                      </li>
                      <li>
                        <span className="insight-icon">🧘‍♀️</span>
                        <div>
                          <h4>Support hormone harmony</h4>
                          <p>Gentle movement, balanced meals & mindful rest keep your cycle in tune.</p>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              );
            })()}

            {/* Intercourse Date Checker */}
            <div className="form-section">
              <h3 style={{marginBottom: '1rem', marginTop: '2rem'}}>Check a Specific Date</h3>
              <div className="form-group">
                <label htmlFor="intercourse-date">Date of Intercourse (Optional)</label>
                <input
                  type="date"
                  id="intercourse-date"
                  value={intercourseDate}
                  onChange={(e) => handleIntercourseDateChange(e.target.value)}
                />
                <p className="form-help">
                  Check if this date falls in your fertile window
                </p>
              </div>

              {intercourseDate && fertilityWindow && (
                <div className="checker-wrap">
                  <div className={`checker-card ${isInFertileWindow ? 'positive' : 'neutral'}`}>
                    <div className="checker-icon">{isInFertileWindow ? '✅' : 'ℹ️'}</div>
                    <div>
                      <h4>{isInFertileWindow ? 'Great timing! 🎉' : 'Outside fertile orbit'}</h4>
                      <p className="checker-main">
                        {isInFertileWindow
                          ? 'This date sits inside your fertile window.'
                          : 'This date sits outside the fertile window.'}
                      </p>
                      <p className="checker-info">Estimated conception probability: {conceptionProb}%</p>
                      <p className="checker-footnote">
                        Fertile window: {format(fertilityWindow.fertileStart, 'MMM d')} –{' '}
                        {format(fertilityWindow.fertileEnd, 'MMM d')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="info-section">
              <h3>💡 How it works</h3>
              <ul>
                <li>Ovulation typically occurs 14 days before your next period</li>
                <li>The fertile window includes 5 days before and the day of ovulation</li>
                <li>Sperm can survive up to 5 days, eggs survive 12-24 hours</li>
                <li>Peak fertility is 2 days before ovulation through ovulation day</li>
                <li>Track for a few months to better understand your cycle patterns</li>
                <li>Always consult with your healthcare provider for personalized advice</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Calculator;

