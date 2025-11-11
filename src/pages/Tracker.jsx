import React, { useState, useEffect, useMemo } from 'react';
import {
  calculateCurrentWeek,
  getBabySize,
  getTrimester,
  getWeeklyMilestone,
  getWeekDevelopment,
  getWeekExperience,
  getWeekCareFocus,
} from '../utils/pregnancyCalculator';
import { useAuth } from '../context/AuthContext';
import './Tracker.css';

function Tracker() {
  const { user, loading } = useAuth();
  const [pregnancyData, setPregnancyData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [journalEntry, setJournalEntry] = useState(null);
  const [journalLoaded, setJournalLoaded] = useState(false);

  const produceEmojiMap = useMemo(
    () => ({
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
    }),
    []
  );

  const defaultJournal = () => ({
    mood: 'Glowing',
    note: '',
    hydration: false,
    kicks: false,
    vitamins: false,
  });

  const getJournalKey = (week) => `blessedbump_tracker_week_${week}`;

  useEffect(() => {
    // Load from user profile first (Supabase), then fallback to localStorage
    if (loading) {
      return; // Wait for auth to finish loading
    }

    if (user?.dueDate) {
      try {
        // Handle both string and Date formats
        const dueDate = user.dueDate instanceof Date 
          ? user.dueDate 
          : new Date(user.dueDate);
        
        // Validate the date
        if (!isNaN(dueDate.getTime())) {
          const weekData = calculateCurrentWeek(dueDate);
          setCurrentWeek(weekData);
          setSelectedWeek(weekData.weeks);
          setPregnancyData({
            dueDate: user.dueDate,
            lmpDate: user.lmpDate,
            conceptionDate: null, // Can be calculated if needed
          });
        } else {
          console.error('Invalid due date format:', user.dueDate);
        }
      } catch (e) {
        console.error('Failed to parse due date from user profile', e);
      }
    } else {
      // Fallback to localStorage
      const savedData = localStorage.getItem('blessedbump_pregnancy_data');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setPregnancyData(data);
          if (data.dueDate) {
            const dueDate = data.dueDate instanceof Date 
              ? data.dueDate 
              : new Date(data.dueDate);
            if (!isNaN(dueDate.getTime())) {
              const weekData = calculateCurrentWeek(dueDate);
              setCurrentWeek(weekData);
              setSelectedWeek(weekData.weeks);
            }
          }
        } catch (e) {
          console.error('Failed to parse pregnancy data from localStorage', e);
        }
      }
    }
  }, [user, loading]);

  useEffect(() => {
    if (!selectedWeek) return;
    const stored = localStorage.getItem(getJournalKey(selectedWeek));
    if (stored) {
      setJournalEntry({ ...defaultJournal(), ...JSON.parse(stored) });
    } else {
      setJournalEntry(defaultJournal());
    }
    setJournalLoaded(true);
  }, [selectedWeek]);

  useEffect(() => {
    if (!selectedWeek || !journalLoaded || !journalEntry) return;
    localStorage.setItem(getJournalKey(selectedWeek), JSON.stringify(journalEntry));
  }, [selectedWeek, journalLoaded, journalEntry]);

  useEffect(() => {
    if (!selectedWeek) return;
    const timelineItem = document.getElementById(`timeline-week-${selectedWeek}`);
    if (timelineItem) {
      timelineItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedWeek]);

  if (loading) {
    return (
      <div className="tracker-page">
        <div className="tracker-empty">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👶</div>
            <p>Loading your journey...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pregnancyData || !currentWeek) {
    return (
      <div className="tracker-page">
        <div className="tracker-empty">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Welcome to Journey Keeper! 🧭</h2>
            <p>To start tracking your pregnancy journey, please set your due date first.</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              Go to <strong>Due-Date Oracle</strong> to calculate and save your due date.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generate weeks array (1-40)
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const currentWeekNum = currentWeek.weeks;
  const activeWeek = selectedWeek || currentWeekNum;
  const babyInfo = getBabySize(activeWeek);
  const trimester = getTrimester(activeWeek);
  const milestone = getWeeklyMilestone(activeWeek);
  const development = getWeekDevelopment(activeWeek);
  const experience = getWeekExperience(activeWeek);
  const careFocus = getWeekCareFocus(activeWeek);
  const produceEmoji = produceEmojiMap[babyInfo.size?.toLowerCase?.() || ''] || '👶';
  const dueDate = pregnancyData?.dueDate ? new Date(pregnancyData.dueDate) : null;
  const formattedDueDate = dueDate
    ? dueDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';
  const totalDaysPregnant = currentWeekNum * 7 + currentWeek.days;
  const progressPercent = Math.min(Math.round((totalDaysPregnant / 280) * 100), 100);
  const daysToGo = Math.max(280 - totalDaysPregnant, 0);

  return (
    <div className="tracker-page">
      <div className="tracker-shell">
        <header className="tracker-header">
          <div>
            <h1>Pregnancy Storybook</h1>
            <p>Swirl through 40 weeks of tiny triumphs and keep notes along the way.</p>
          </div>
          <div className="tracker-header-meta">
            <span className="meta-label">Due Date</span>
            <span className="meta-value">{formattedDueDate}</span>
            <span className="meta-caption">
              {daysToGo > 0 ? `${daysToGo} days remaining` : 'Baby time is near!'}
            </span>
          </div>
        </header>

        <section className="tracker-overview">
          <div className="overview-card">
            <div className="overview-top">
              <div>
                <span className="overview-chip">Week {currentWeekNum}</span>
                <h2>Journey Progress</h2>
              </div>
              <div className="overview-trimester">Trimester {getTrimester(currentWeekNum)}</div>
            </div>
            <div className="overview-progress">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="progress-stats">
                <div>
                  <span className="progress-label">Completed</span>
                  <span className="progress-value">{progressPercent}%</span>
                </div>
                <div>
                  <span className="progress-label">Days to go</span>
                  <span className="progress-value">{daysToGo}</span>
                </div>
                <div>
                  <span className="progress-label">Current week</span>
                  <span className="progress-value">{currentWeekNum}</span>
                </div>
              </div>
            </div>
          </div>
          {milestone && (
            <div className="milestone-highlight">
              <span className="milestone-icon">🌟</span>
              <div>
                <p className="milestone-title">This Week&apos;s Spark</p>
                <p className="milestone-text">{milestone}</p>
              </div>
      </div>
          )}
        </section>

        <section className="timeline-card">
          <div className="timeline-header">
            <h3>Scroll the weeks</h3>
            <p>Select a week to reveal milestones, care notes, and space for your memories.</p>
          </div>
          <div className="timeline-wrapper">
            <div className="timeline-track">
            {weeks.map((week) => {
              const isCurrent = week === currentWeekNum;
                const hasMilestone = Boolean(getWeeklyMilestone(week));
              return (
                <button
                    id={`timeline-week-${week}`}
                    type="button"
                  key={week}
                    className={`timeline-item ${week < currentWeekNum ? 'past' : ''} ${
                      week === activeWeek ? 'active' : ''
                    } ${week > currentWeekNum ? 'future' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setSelectedWeek(week)}
                >
                    <span className="timeline-dot" />
                    <span className="timeline-label">Week {week}</span>
                    {isCurrent && <span className="timeline-badge">Now</span>}
                    {hasMilestone && <span className="timeline-milestone">✨</span>}
                </button>
              );
            })}
          </div>
        </div>
        </section>

        <section className="week-layout">
          <article className="hero-card">
            <div className="hero-header">
              <div>
                <span className="hero-week">Week {activeWeek}</span>
                <h2>Baby&apos;s cozy home update</h2>
              </div>
              <span className="hero-trimester">Trimester {trimester}</span>
            </div>
            <div className="hero-body">
              <div className="hero-avatar">
                <span className="hero-emoji">{produceEmoji}</span>
                <span className="hero-emoji-shadow" />
              </div>
              <div className="hero-stats">
                <div>
                  <span className="stat-label">Size companion</span>
                  <span className="stat-value">{babyInfo.size}</span>
                </div>
                <div>
                  <span className="stat-label">Length</span>
                  <span className="stat-value">{babyInfo.length} cm</span>
                </div>
                <div>
                  <span className="stat-label">Weight</span>
                  <span className="stat-value">{babyInfo.weight} g</span>
                </div>
              </div>
            </div>
            <p className="hero-quote">
              “Look Mumma, this week I&apos;m stretching and growing into a {babyInfo.size
                ?.toLowerCase()
                || 'tiny wonder'}!”
            </p>
          </article>

          <article className="story-card">
            <h3>{development.headline}</h3>
            <ul>
              {development.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>

          <article className="experience-card">
            <h3>Your body&apos;s whispers</h3>
            <div className="experience-section">
              <span className="experience-icon">💫</span>
              <div>
                <p className="experience-label">What you might notice</p>
                <p>{experience.body}</p>
              </div>
            </div>
            <div className="experience-section">
              <span className="experience-icon soothe">🌿</span>
              <div>
                <p className="experience-label">Gentle comforts</p>
                <p>{experience.soothe}</p>
              </div>
            </div>
          </article>

          <article className="care-card">
            <h3>Care plan focus</h3>
            <div className="care-group">
              <p className="care-label">Appointments &amp; prep</p>
              <ul>
                {careFocus.appointments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="care-group">
              <p className="care-label">Questions for your team</p>
              <ul>
                {careFocus.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="care-group">
              <p className="care-label">Self-care focus</p>
              <ul>
                {careFocus.selfCare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="journal-card">
            <h3>Baby journal moment</h3>
            <p className="journal-subtitle">
              Capture today’s feeling—these tiny notes become the sweetest keepsakes.
            </p>
            {journalEntry && (
              <form className="journal-form">
                <div className="journal-field">
                  <label htmlFor="journal-mood">Mood check-in</label>
                  <select
                    id="journal-mood"
                    value={journalEntry.mood}
                    onChange={(event) =>
                      setJournalEntry((prev) => ({ ...prev, mood: event.target.value }))
                    }
                  >
                    <option>Glowing</option>
                    <option>Peaceful</option>
                    <option>Thoughtful</option>
                    <option>Tired-but-grateful</option>
                    <option>Celebrating kicks</option>
                  </select>
                </div>

                <div className="journal-field">
                  <label htmlFor="journal-note">Dear baby…</label>
                  <textarea
                    id="journal-note"
                    rows={4}
                    placeholder="Write a little note about today, a feeling, or a wish."
                    value={journalEntry.note}
                    onChange={(event) =>
                      setJournalEntry((prev) => ({ ...prev, note: event.target.value }))
                    }
                  />
                </div>

                <div className="journal-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      checked={journalEntry.hydration}
                      onChange={(event) =>
                        setJournalEntry((prev) => ({ ...prev, hydration: event.target.checked }))
                      }
                    />
                    Water goal met
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={journalEntry.kicks}
                      onChange={(event) =>
                        setJournalEntry((prev) => ({ ...prev, kicks: event.target.checked }))
                      }
                    />
                    Noted baby movements
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={journalEntry.vitamins}
                      onChange={(event) =>
                        setJournalEntry((prev) => ({ ...prev, vitamins: event.target.checked }))
                      }
                    />
                    Took prenatal vitamins
                  </label>
                </div>
              </form>
            )}
            <p className="journal-save-hint">Saved automatically for Week {activeWeek} ✨</p>
          </article>

          <article className="resources-card">
            <h3>Wrap-around support</h3>
            <div className="resource-links">
              <a href="/tracker" className="resource-link">
                📊 Review dashboard insights
              </a>
              <a href="/calculator" className="resource-link">
                📅 Revisit due date calculator
              </a>
              <a href="/community" className="resource-link">
                💬 Share in community
              </a>
        </div>
            <p className="resource-note">
              Tip: Screenshot your journal cards or copy them into a keepsake book each week.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Tracker;

