import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import {
  calculateOvulationWindow,
  checkDateInFertileWindow,
  getConceptionProbability,
} from '../utils/pregnancyCalculator';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Fertility.css';

function formatISODate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().split('T')[0];
}

function Fertility() {
  const {
    user,
    updateFertilityLog,
    openAuthModal,
  } = useAuth();

  const [lmpDate, setLmpDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [intercourseDate, setIntercourseDate] = useState('');

  const [fertilityWindow, setFertilityWindow] = useState(null);
  const [isInFertileWindow, setIsInFertileWindow] = useState(false);
  const [conceptionProb, setConceptionProb] = useState(null);

  const [statusMessage, setStatusMessage] = useState(null);
  const [statusTone, setStatusTone] = useState('info');
  const [saving, setSaving] = useState(false);
  const [loadingLog, setLoadingLog] = useState(false);
  const [savedLog, setSavedLog] = useState(null);

  const resetStatus = () => {
    setStatusMessage(null);
    setStatusTone('info');
  };

  const runCalculation = useCallback((baseLmp, baseCycle, customIntercourseDate) => {
    if (!baseLmp || !baseCycle) {
      setFertilityWindow(null);
      setIsInFertileWindow(false);
      setConceptionProb(null);
      return;
    }

    const window = calculateOvulationWindow(baseLmp, baseCycle);
    setFertilityWindow(window);

    const referenceIntercourse = customIntercourseDate ?? intercourseDate;

    if (referenceIntercourse) {
      const inWindow = checkDateInFertileWindow(referenceIntercourse, baseLmp, baseCycle);
      const probability = getConceptionProbability(referenceIntercourse, baseLmp, baseCycle);
      setIsInFertileWindow(inWindow);
      setConceptionProb(probability);
    } else {
      setIsInFertileWindow(false);
      setConceptionProb(null);
    }
  }, [intercourseDate]);

  const loadSavedLog = useCallback(
    async () => {
      if (!user) {
        setSavedLog(null);
        return;
      }

      setLoadingLog(true);
      try {
        const { data, error } = await supabase
          .from('fertility_logs')
          .select(
            `
              fertility_lmp_date,
              cycle_length,
              fertile_start_date,
              fertile_end_date,
              ovulation_date,
              next_period,
              intercourse_date,
              conception_probability,
              is_in_window,
              updated_at
            `,
          )
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          const savedLmp = formatISODate(data.fertility_lmp_date);
          const savedCycle = data.cycle_length || 28;
          const savedIntercourse = formatISODate(data.intercourse_date);

          setSavedLog(data);
          setLmpDate(savedLmp);
          setCycleLength(savedCycle);
          setIntercourseDate(savedIntercourse);
          runCalculation(savedLmp, savedCycle, savedIntercourse);

          if (data.intercourse_date) {
            setIsInFertileWindow(Boolean(data.is_in_window));
            setConceptionProb(data.conception_probability ?? null);
          }
        } else {
          setSavedLog(null);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to load fertility log', error);
        setSavedLog(null);
      } finally {
        setLoadingLog(false);
      }
    },
    [runCalculation, user],
  );

  useEffect(() => {
    loadSavedLog();
  }, [loadSavedLog]);

  const handleCalculate = (event) => {
    event.preventDefault();
    resetStatus();
    runCalculation(lmpDate, cycleLength);
  };

  const handleCycleChange = (value) => {
    const parsed = Number(value);
    const safeValue = Number.isNaN(parsed) ? 28 : Math.min(Math.max(parsed, 21), 45);
    setCycleLength(safeValue);
    runCalculation(lmpDate, safeValue);
  };

  const handleIntercourseDateChange = (value) => {
    setIntercourseDate(value);
    if (value && lmpDate && cycleLength) {
      const inWindow = checkDateInFertileWindow(value, lmpDate, cycleLength);
      const probability = getConceptionProbability(value, lmpDate, cycleLength);
      setIsInFertileWindow(inWindow);
      setConceptionProb(probability);
    } else {
      setIsInFertileWindow(false);
      setConceptionProb(null);
    }
  };

  const handleSave = async () => {
    if (!fertilityWindow) {
      setStatusTone('error');
      setStatusMessage('Run the oracle first to generate your fertile window.');
      return;
    }

    if (!user) {
      openAuthModal('login', '/fertility');
      return;
    }

    setSaving(true);
    resetStatus();

    try {
      const payload = {
        cycle_length: cycleLength,
        fertility_lmp_date: lmpDate,
        fertile_start_date: fertilityWindow.fertileStart.toISOString(),
        fertile_end_date: fertilityWindow.fertileEnd.toISOString(),
        ovulation_date: fertilityWindow.ovulationDate.toISOString(),
        next_period: fertilityWindow.nextPeriod.toISOString(),
        intercourse_date: intercourseDate || null,
        conception_probability: conceptionProb ?? null,
        is_in_window: isInFertileWindow,
      };

      const data = await updateFertilityLog(payload);
      setSavedLog(data);
      setStatusTone('success');
      setStatusMessage('Fertility insights saved to your profile. 🌸');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save fertility insights', error);
      setStatusTone('error');
      setStatusMessage(error.message || 'Unable to save fertility insights right now.');
    } finally {
      setSaving(false);
    }
  };

  const fertileRangeLabel = useMemo(() => {
    if (!fertilityWindow) return null;
    return `${format(fertilityWindow.fertileStart, 'MMM d')} – ${format(
      fertilityWindow.fertileEnd,
      'MMM d, yyyy',
    )}`;
  }, [fertilityWindow]);

  const cycleSegments = useMemo(() => {
    const follicularDays = Math.max(cycleLength - 14, 7);
    return [
      {
        label: 'Follicular flow',
        days: follicularDays,
        descriptor: 'Estrogen rises & follicles mature.',
      },
      {
        label: 'Ovulation spark',
        days: 1,
        descriptor: 'Egg release & peak fertility.',
      },
      {
        label: 'Luteal nesting',
        days: 14,
        descriptor: 'Progesterone supports implantation or restart.',
      },
    ];
  }, [cycleLength]);

  const summaryHighlights = useMemo(() => {
    if (!fertilityWindow) return [];
    return [
      {
        key: 'fertile-window',
        icon: '🌸',
        label: 'Fertile window',
        value: fertileRangeLabel,
        helper: 'Sweet spot for conception magic.',
      },
      {
        key: 'peak-fertility',
        icon: '✨',
        label: 'Peak fertility',
        value: `${format(fertilityWindow.peakDays.day4, 'MMM d')} – ${format(
          fertilityWindow.ovulationDate,
          'MMM d',
        )}`,
        helper: 'Aim for 2 days before ovulation through ovulation day.',
      },
      {
        key: 'next-period',
        icon: '🗓️',
        label: 'Next period',
        value: format(fertilityWindow.nextPeriod, 'EEE, MMM d'),
        helper: 'Projected based on your cycle rhythm.',
      },
    ];
  }, [fertilityWindow, fertileRangeLabel]);

  return (
    <div className="fertility-page">
      <header className="fertility-hero">
        <div className="fertility-hero-copy">
          <p className="hero-kicker">Fertility & Ovulation Oracle 🌸</p>
          <h1>Align with your cycle and welcome new possibilities</h1>
          <p>
            Discover your fertile window, receive nurturing rituals, and save cycle insights so the GlowBoard and
            Journey Keeper stay in step with your dreams of conception.
          </p>
          <div className="hero-bullets">
            <span>✨ Personalised fertile window</span>
            <span>🪄 Mind-body rituals & nourishment tips</span>
            <span>📔 Saved to your BlessedBump profile</span>
          </div>
          <a className="hero-cta" href="#fertility-calculator">
            Start the oracle →
          </a>
        </div>
        <div className="fertility-hero-visual" aria-hidden>
          <div className="moon-orbit">
            <div className="moon-core">🌙</div>
            <div className="moon-ring" />
            <div className="moon-fireflies">
              <span>✺</span>
              <span>✶</span>
              <span>✷</span>
            </div>
          </div>
        </div>
      </header>

      <main className="fertility-body">
        <section className="fertility-grid">
          <div className="fertility-calc-column">
            <section id="fertility-calculator" className="fertility-card">
              <header className="card-header">
                <h2>Cycle oracle</h2>
                <p>Enter your latest period to map ovulation and fertile trends.</p>
              </header>
              <form onSubmit={handleCalculate} className="fertility-form">
                <div className="form-duo">
                  <div className="form-group">
                    <label htmlFor="fertility-lmp">Last Period Start</label>
                    <input
                      id="fertility-lmp"
                      type="date"
                      value={lmpDate}
                      onChange={(event) => {
                        setLmpDate(event.target.value);
                        resetStatus();
                      }}
                      required
                    />
                    <p>Pick the first day of your most recent period.</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cycle-length">Average Cycle Length (days)</label>
                    <input
                      id="cycle-length"
                      type="number"
                      min="21"
                      max="45"
                      value={cycleLength}
                      onChange={(event) => handleCycleChange(event.target.value)}
                      required
                    />
                    <p>Most cycles fall between 21 and 45 days (default: 28).</p>
                  </div>
                </div>

                <button type="submit" className="fertility-primary">
                  Calculate fertile window
                </button>
              </form>

              <div className="form-group tucked">
                <label htmlFor="intercourse-date">Check a specific date (optional)</label>
                <input
                  type="date"
                  id="intercourse-date"
                  value={intercourseDate}
                  onChange={(event) => handleIntercourseDateChange(event.target.value)}
                  disabled={!lmpDate}
                />
                <p>See if this day sits inside your fertile window.</p>
              </div>

              {statusMessage && (
                <div className={`fertility-status ${statusTone}`}>
                  {statusMessage}
                </div>
              )}
            </section>

            {fertilityWindow ? (
              <section className="fertility-card">
                <header className="card-header">
                  <h2>Your fertile constellation</h2>
                  <p>Ovulation forecast · {format(fertilityWindow.ovulationDate, 'EEEE, MMM d, yyyy')}</p>
                </header>

                <div className="fertility-summary">
                  {summaryHighlights.map((item) => (
                    <article key={item.key} className="summary-pod">
                      <span className="summary-icon" role="img" aria-hidden>
                        {item.icon}
                      </span>
                      <div className="summary-text">
                        <span className="summary-label">{item.label}</span>
                        <span className="summary-value">{item.value}</span>
                        <p>{item.helper}</p>
                      </div>
                      <span className="summary-glow" aria-hidden />
                    </article>
                  ))}
                </div>

                <div className="cycle-bar">
                  {cycleSegments.map((segment) => (
                    <div key={segment.label} style={{ flex: segment.days }}>
                      <span>{segment.label}</span>
                      <small>{segment.days} {segment.days === 1 ? 'day' : 'days'}</small>
                    </div>
                  ))}
                </div>
                <p className="cycle-footnote">
                  Ovulation usually occurs {differenceInDays(fertilityWindow.nextPeriod, fertilityWindow.ovulationDate)} days
                  before your next period.
                </p>

                {intercourseDate && (
                  <div className={`checker-card ${isInFertileWindow ? 'positive' : 'neutral'}`}>
                    <div className="checker-icon">{isInFertileWindow ? '✅' : 'ℹ️'}</div>
                    <div>
                      <h3>{isInFertileWindow ? 'Lovely timing!' : 'Outside fertile orbit'}</h3>
                      <p>
                        {isInFertileWindow
                          ? 'This date sits inside the fertile window.'
                          : 'This date sits outside the fertile window.'}
                      </p>
                      <p className="checker-prob">
                        Estimated conception probability: <strong>{conceptionProb ?? 0}%</strong>
                      </p>
                    </div>
                  </div>
                )}

                <div className="fertility-actions">
                  <button
                    type="button"
                    className="fertility-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving…' : 'Save to my profile'}
                  </button>
                  {savedLog && (
                    <span className="fertility-save-hint">
                      Last saved {format(new Date(savedLog.updated_at), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </section>
            ) : (
              <section className="fertility-placeholder">
                <h3>Waiting for your glow</h3>
                <p>
                  Calculate to reveal peak days, timing tips, and rituals that honour your conception journey.
                </p>
              </section>
            )}
          </div>

          <aside className="fertility-side">
            <section className="fertility-card">
              <header className="card-header">
                <h2>Cycle wisdom</h2>
                <p>Anchor your mind, body, and spirit to each phase.</p>
              </header>
              <ul className="insight-stack">
                <li>
                  <span className="insight-icon">🕯️</span>
                  <div>
                    <h3>Soothe follicular tides</h3>
                    <p>
                      Up hydration, magnesium, and leafy greens. Gentle flows like yoga or walking keep energy supple.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="insight-icon">🌺</span>
                  <div>
                    <h3>Celebrate ovulation spark</h3>
                    <p>
                      Boost intimacy, rest, and nutrient-dense meals. Think berries, salmon, and B-vitamins.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="insight-icon">🛀</span>
                  <div>
                    <h3>Nurture luteal nesting</h3>
                    <p>
                      Choose calming rituals—warm baths, journaling, and deeper sleep support to aid implantation.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="fertility-card">
              <header className="card-header">
                <h2>Saved insights</h2>
                <p>Revisit your most recent fertile window at a glance.</p>
              </header>
              {loadingLog ? (
                <div className="fertility-placeholder">Loading your fertility log…</div>
              ) : savedLog ? (
                <div className="saved-insights">
                  <div>
                    <span className="summary-label">Saved on</span>
                    <span className="summary-value">
                      {format(new Date(savedLog.updated_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div>
                    <span className="summary-label">Fertile window</span>
                    <span className="summary-value">
                      {format(new Date(savedLog.fertile_start_date), 'MMM d')} –{' '}
                      {format(new Date(savedLog.fertile_end_date), 'MMM d')}
                    </span>
                  </div>
                  <div>
                    <span className="summary-label">Cycle length</span>
                    <span className="summary-value">{savedLog.cycle_length} days</span>
                  </div>
                  {savedLog.conception_probability !== null && (
                    <div>
                      <span className="summary-label">Probability</span>
                      <span className="summary-value">
                        {savedLog.conception_probability}% ({savedLog.is_in_window ? 'inside window' : 'outside'})
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="fertility-placeholder">
                  No saved fertility insights yet. Calculate & save to see them here.
                </div>
              )}
            </section>

            <section className="fertility-card">
              <header className="card-header">
                <h2>Rituals & reflections</h2>
                <p>Gentle prompts to align heart and body.</p>
              </header>
              <ul className="insight-stack">
                <li>
                  <span className="insight-icon">🕊️</span>
                  <div>
                    <h3>Evening unwinding</h3>
                    <p>
                      Sip herbal infusions (raspberry leaf, chamomile) and note three gratitudes or intentions nightly.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="insight-icon">🫶</span>
                  <div>
                    <h3>Partner sync</h3>
                    <p>
                      Share cycle timing, plan connection rituals, and invite supportive touch or massages.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="insight-icon">📓</span>
                  <div>
                    <h3>Journal reflections</h3>
                    <p>
                      Track mood, energy, and cervical fluid. Record the thoughts you want to remember for future cycles.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Fertility;

