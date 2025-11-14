import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calculateDueDate,
  calculateConceptionDate,
  calculateCurrentWeek,
  getTrimester,
  getBabySize,
  getWeekDevelopment,
  getWeekExperience,
  getWeekCareFocus,
} from '../utils/pregnancyCalculator';
import { format, addDays, differenceInDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import './Calculator.css';

const PRENATAL_CHECKPOINTS = [
  {
    week: 8,
    icon: '🩺',
    title: 'Heartbeat confirmation',
    description: 'First prenatal visit to confirm your due date and hear the heartbeat.',
  },
  {
    week: 12,
    icon: '🧬',
    title: 'Screening conversations',
    description: 'Review NIPT results and first-trimester screening options.',
  },
  {
    week: 16,
    icon: '🔊',
    title: 'Cue the kicks',
    description: 'Notice the first flutters and discuss quickening with your provider.',
  },
  {
    week: 20,
    icon: '🌀',
    title: 'Anatomy scan',
    description: 'Detailed ultrasound to explore baby’s growth and placenta placement.',
  },
  {
    week: 24,
    icon: '🍯',
    title: 'Glucose screening',
    description: 'Check on blood sugar and iron levels to support third trimester energy.',
  },
  {
    week: 28,
    icon: '💉',
    title: 'Rhogam & boosters',
    description: 'Receive Rhogam if needed and update flu/TDAP protection.',
  },
  {
    week: 32,
    icon: '📋',
    title: 'Birth plan glow-up',
    description: 'Finalize birth preferences, newborn care choices, and support team roles.',
  },
  {
    week: 36,
    icon: '🧪',
    title: 'Group B strep swab',
    description: 'Quick test and labour game-plan refresh with your care team.',
  },
  {
    week: 38,
    icon: '🎒',
    title: 'Labour readiness',
    description: 'Pack the hospital bag, preset childcare, and map your transport plan.',
  },
];

const TRIMESTER_SPOTLIGHTS = {
  1: {
    affirmation: 'Your body is crafting baby’s first home—rest and nourishment are worth celebrating.',
    rituals: [
      'Layer snacks, protein, and B6-rich foods to soften nausea waves.',
      'Schedule first prenatal visits and add key dates to your calendar.',
      'Sip water every hour and stretch gently to ease early fatigue.',
    ],
  },
  2: {
    affirmation: 'Energy is rising—follow the glow and celebrate each flutter.',
    rituals: [
      'Document baby’s heartbeat and anatomy scan highlights in your journal.',
      'Refresh your movement routine with prenatal yoga or swimming.',
      'Start assembling a registry or nursery vision mood board.',
    ],
  },
  3: {
    affirmation: 'You’re entering the nesting season—gather comfort, support, and confidence.',
    rituals: [
      'Set weekly check-ins for kick counts and hydration cues.',
      'Prep freezer-friendly meals and plan postpartum support.',
      'Pack your birthing bag and review comfort measures with your team.',
    ],
  },
};

function Calculator() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, updateUser, openAuthModal } = useAuth();
  const [lmpDate, setLmpDate] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [conceptionDate, setConceptionDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('blessedbump_pregnancy_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.lmpDate) {
        setLmpDate(data.lmpDate);
        calculateDates(data.lmpDate);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.lmpDate) {
      const normalized = user.lmpDate.includes('T')
        ? user.lmpDate.split('T')[0]
        : user.lmpDate;
      setLmpDate(normalized);
      calculateDates(normalized);
    } else if (!user) {
      setLmpDate('');
      setDueDate(null);
      setConceptionDate(null);
      setCurrentWeek(null);
      setSaved(false);
    }
  }, [user]);

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

  const handleSave = async () => {
    if (!user) {
      openAuthModal('login', '/dashboard');
      return;
    }

    // Save to localStorage first (this always works) - immediate feedback
    const pregnancyData = {
      lmpDate,
      dueDate: dueDate?.toISOString(),
      conceptionDate: conceptionDate?.toISOString(),
      currentWeek: currentWeek?.weeks,
    };

    localStorage.setItem('blessedbump_pregnancy_data', JSON.stringify(pregnancyData));
    
    // Show saved state immediately for better UX
    setSaved(true);

    try {
      // Check if session is still valid before attempting update
      if (!user || !user.id) {
        console.warn('User session appears invalid, saving to localStorage only');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800); // Reduced from 1500ms
        return;
      }

      // Update user profile in Supabase (with timeout and retry built into updateUser)
      // Don't wait for profile refresh - just update directly
      await Promise.race([
        updateUser({
          lmp_date: lmpDate || null,
          due_date: dueDate ? dueDate.toISOString() : null,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Save timeout')), 8000)
        )
      ]);

      // Success - redirect faster
      setTimeout(() => {
        navigate('/dashboard');
      }, 800); // Reduced from 1500ms
    } catch (error) {
      console.error('Failed to sync pregnancy data to database', error);
      
      // Even if database sync fails, data is saved to localStorage
      // Show success message but note it's local only
      // Don't show error to user - data is saved locally and will sync later
      setTimeout(() => {
        navigate('/dashboard');
      }, 800); // Reduced from 1500ms
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-hero">
          <div className="hero-copy">
            <p className="hero-kicker">Due Date Oracle ✨</p>
            <h1>Plot baby’s grand debut with celestial precision</h1>
            <p>
              Enter your LMP to unveil milestone dates, trimester guideposts, and rituals curated for this exact week.
              Save your oracle to keep GlowBoard, Journey Keeper, and your care team in perfect sync.
            </p>
            <div className="hero-highlights">
              <span>🔮 Personalised timeline & countdown</span>
              <span>🌱 Weekly baby & body spotlights</span>
              <span>📆 Appointment & prep reminders</span>
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

        {/* Due Date Calculator */}
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
          const trimester = getTrimester(currentWeek.weeks);
          const trimesterName = {
            1: 'Trimester one · Foundations',
            2: 'Trimester two · Blooming',
            3: 'Trimester three · Nesting',
          }[trimester] || 'Pregnancy journey';
          const weeksRemaining = Math.max(40 - currentWeek.weeks, 0);
          const daysUntilDue = Math.max(differenceInDays(dueDate, new Date()), 0);
          const dueWindowStart = addDays(dueDate, -7);
          const dueWindowEnd = addDays(dueDate, 7);

          const babySize = getBabySize(currentWeek.weeks);
          const development = getWeekDevelopment(currentWeek.weeks);
          const experience = getWeekExperience(currentWeek.weeks);
          const careFocus = getWeekCareFocus(currentWeek.weeks);
          const trimesterSpotlight = TRIMESTER_SPOTLIGHTS[trimester];

          const milestoneBlueprint = [
            { label: 'Heartbeat echoes', offset: 42, description: 'Baby’s heart, limbs, and placenta gain momentum.' },
            { label: 'Flutter awakening', offset: 98, description: 'Quickening begins and energy gently returns.' },
            { label: 'Anatomy constellation', offset: 140, description: 'Detailed scan celebrates baby’s growth peaks.' },
            { label: 'Nesting nebula', offset: 210, description: 'Birth plans, nursery glow, and third-trimester care.' },
            { label: 'Due date glow', offset: 280, description: 'Hospital bags zipped, hearts ready for cuddles.' },
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

          const upcomingCheckpoints = PRENATAL_CHECKPOINTS
            .map((checkpoint) => {
              const appointmentDate = addDays(lmp, checkpoint.week * 7);
              return {
                ...checkpoint,
                dateLabel: format(appointmentDate, 'MMM d, yyyy'),
                weeksUntil: checkpoint.week - currentWeek.weeks,
              };
            })
            .filter((checkpoint) => checkpoint.weeksUntil >= -1)
            .slice(0, 4);

          const babyLengthLabel = babySize?.length ? `~${babySize.length} cm` : 'Growing each sunrise';
          const babyWeightLabel = babySize?.weight ? `~${babySize.weight} g` : 'Adding softness daily';

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

                <div className="summary-badges">
                  <span>{trimesterName}</span>
                  <span>{weeksRemaining} weeks to go</span>
                  {babySize?.size && <span>Baby ≈ {babySize.size.toLowerCase()}</span>}
                </div>

                <div className="summary-window">
                  <div>
                    <p className="window-label">Likely birth window</p>
                    <p className="window-range">
                      {format(dueWindowStart, 'MMM d')} – {format(dueWindowEnd, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="window-count">
                    <span className="window-number">{daysUntilDue}</span>
                    <span className="window-caption">days to go</span>
                  </div>
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

              <div className="insight-grid">
                <section className="insight-card baby-spotlight">
                  <header>
                    <h3>Baby this week</h3>
                    <p className="insight-lead">{development?.headline || 'Baby is unfolding beautifully.'}</p>
                  </header>
                  <div className="baby-size-wrap">
                    {babySize?.size && <span className="baby-size-chip">≈ {babySize.size}</span>}
                    <div className="baby-measures">
                      <span>{babyLengthLabel}</span>
                      <span>{babyWeightLabel}</span>
                    </div>
                  </div>
                  <ul className="insight-list">
                    {(development?.details || ['Every hour adds new magic to baby’s story.']).map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </section>

                <section className="insight-card body-attune">
                  <header>
                    <h3>You & your body</h3>
                    <p className="insight-lead">{experience?.body || 'Notice how your body whispers its needs.'}</p>
                  </header>
                  <div className="insight-note">
                    <span className="note-label">Soothe</span>
                    <p>{experience?.soothe || 'Breathe deeply, rest often, and lean on your circle.'}</p>
                  </div>
                  {trimesterSpotlight && (
                    <blockquote className="insight-affirmation">
                      <span className="quote-mark">“</span>
                      {trimesterSpotlight.affirmation}
                    </blockquote>
                  )}
                </section>

                <section className="insight-card care-compass">
                  <header>
                    <h3>Care focus</h3>
                    <p className="insight-lead">Questions, appointments, and rituals to keep handy.</p>
                  </header>
                  <div className="care-columns">
                    <div>
                      <span className="care-column-title">Appointments</span>
                      <ul>
                        {(careFocus?.appointments || ['Note upcoming visits and jot questions ahead of time.']).map(
                          (item) => (
                            <li key={item}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="care-column-title">Questions</span>
                      <ul>
                        {(careFocus?.questions || ['Ask about any new sensations or curiosities you’re feeling.']).map(
                          (item) => (
                            <li key={item}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="care-column-title">Self-care</span>
                      <ul>
                        {(careFocus?.selfCare || ['Protect your rest and let friends help with the little things.']).map(
                          (item) => (
                            <li key={item}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

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

              <section className="planning-card">
                <header className="planning-header">
                  <h3>Up next on your care map</h3>
                  <p>Preview the next few touch-points so you can walk in feeling prepared and supported.</p>
                </header>
                <ul className="planning-list">
                  {upcomingCheckpoints.length > 0 ? (
                    upcomingCheckpoints.map((checkpoint) => (
                      <li key={checkpoint.title}>
                        <span className="planning-icon" aria-hidden>
                          {checkpoint.icon}
                        </span>
                        <div>
                          <div className="planning-top-row">
                            <h4>{checkpoint.title}</h4>
                            <span>Week {checkpoint.week}</span>
                          </div>
                          <p>{checkpoint.description}</p>
                          <span className="planning-date">{checkpoint.dateLabel}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="planning-placeholder">
                      You are ahead of schedule—savour this calm and keep tuning into your body’s cues.
                    </li>
                  )}
                </ul>
                {trimesterSpotlight && (
                  <div className="planning-rituals">
                    <h4>Trimester rituals to savour</h4>
                    <ul>
                      {trimesterSpotlight.rituals.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
      </div>
    </div>
  );
}

export default Calculator;

