import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import './BabyExpress.css';

function BabyExpress({ currentWeekNumber, currentWeekDays, formattedDueDate }) {
  const stops = useMemo(
    () => [
      {
        id: 'spark-knowing',
        title: 'Spark of Knowing',
        description: 'Two pink lines and joyful whispers.',
        icon: '✨',
        startWeek: 0,
        future: 'Let the news settle in, breathe deeply, and begin a gratitude note for baby.',
      },
      {
        id: 'heartbeat-visit',
        title: 'Heartbeat Confirmation',
        description: 'Vitals, due-date math, and prenatal basics.',
        icon: '🩺',
        startWeek: 4,
        future: 'Celebrate hearing that tiny rhythm and jot down every question for your care team.',
      },
      {
        id: 'first-trimester-farewell',
        title: 'First Trimester Farewell',
        description: 'Nuchal scan, early screenings, symptom check.',
        icon: '🧪',
        startWeek: 11,
        future: 'Mark your courageous journey so far and plan a small “we did it” moment.',
      },
      {
        id: 'blossom-glow',
        title: 'Blossom Glow',
        description: 'Energy lift, bump pops, maternity wardrobe fun.',
        icon: '🌼',
        startWeek: 14,
        future: 'Capture your blooming silhouette and plan a gentle adventure for the second trimester.',
      },
      {
        id: 'storytime-sonogram',
        title: 'Storytime Sonogram',
        description: 'Detailed ultrasound to see every stretch and swirl.',
        icon: '🖥️',
        startWeek: 20,
        future: 'Invite baby’s loved ones to admire those little fingers and dream up your birth playlist.',
      },
      {
        id: 'sweet-balance',
        title: 'Sweet Balance Check',
        description: 'Check in on blood sugar and overall wellness.',
        icon: '🧃',
        startWeek: 26,
        future: 'Pair nourishing snacks with mindful movement to keep energy sparkling.',
      },
      {
        id: 'nesting-season',
        title: 'Nesting Season',
        description: 'Frequent visits, baby shower sparkles, nursery setup.',
        icon: '🎀',
        startWeek: 28,
        future: 'Sprinkle love around the nursery and sketch your gentle birth preferences.',
      },
      {
        id: 'guardian-swirl',
        title: 'Guardian Swirl',
        description: 'Quick swab to prep for delivery day safety.',
        icon: '🧫',
        startWeek: 36,
        future: 'Double-check your hospital bag, car seat, and support circle call list.',
      },
      {
        id: 'radiant-ready',
        title: 'Radiant & Ready',
        description: 'Hospital bag packed, car seat clicked, support team on-call.',
        icon: '🧳',
        startWeek: 38,
        future: 'Visualise your first cuddle and plan a nourishing meal to enjoy after birth.',
      },
      {
        id: 'hello-world',
        title: 'Hello, World',
        description: 'Ready for cuddles, skin-to-skin, and first latch.',
        icon: '👶',
        startWeek: 39,
        future: 'Lean on your support crew, savour those first meetings, and snap keepsake photos.',
      },
      {
        id: 'fourth-embrace',
        title: 'Fourth Trimester Embrace',
        description: 'Nestle in, recover, and bond at home.',
        icon: '💞',
        startWeek: 41,
        future: 'Create cosy rituals, accept help, and honour each small win with your tiny miracle.',
      },
    ],
    []
  );

  const totalStops = stops.length;

  const currentStopIndex = stops.findIndex((stop, index) => {
    const nextStop = stops[index + 1];
    if (!nextStop) {
      return true;
    }
    return currentWeekNumber >= stop.startWeek && currentWeekNumber < nextStop.startWeek;
  });

  const safeCurrentStopIndex = currentStopIndex === -1 ? totalStops - 1 : currentStopIndex;
  const currentStop = stops[safeCurrentStopIndex];
  const nextStop = stops[safeCurrentStopIndex + 1];

  const stationSpacing = 280;
  const stationBaseOffset = 200;
  const baselineY = 140;
  const amplitude = 52;

  const stopPositionsPx = useMemo(
    () => stops.map((_, index) => stationBaseOffset + index * stationSpacing),
    [stops, stationBaseOffset, stationSpacing]
  );

  const trackWidthPx = useMemo(() => {
    if (!stopPositionsPx.length) return 1_000;
    return stopPositionsPx[stopPositionsPx.length - 1] + stationBaseOffset;
  }, [stopPositionsPx, stationBaseOffset]);

  const getWaveY = useCallback(
    (x) => baselineY + Math.sin((x / stationSpacing) * Math.PI) * amplitude,
    [baselineY, stationSpacing, amplitude]
  );
  const stopVerticalOffset = 80;
  const cartVerticalOffset = 86;

  const buildSegmentPath = (fromIndex, toIndex) => {
    if (
      fromIndex < 0 ||
      toIndex <= fromIndex ||
      toIndex >= stopPositionsPx.length ||
      stopPositionsPx.length < 2
    ) {
      return '';
    }

    const startX = stopPositionsPx[fromIndex];
    let pathString = `M ${startX} ${getWaveY(startX)}`;

    for (let i = fromIndex + 1; i <= toIndex; i += 1) {
      const prevX = stopPositionsPx[i - 1];
      const currentX = stopPositionsPx[i];
      const midX = (prevX + currentX) / 2;
      const controlY = baselineY + amplitude * (i % 2 === 0 ? -1 : 1);
      pathString += ` C ${midX} ${controlY}, ${midX} ${controlY}, ${currentX} ${getWaveY(currentX)}`;
    }

    return pathString;
  };

  const snakePath = useMemo(() => {
    if (!stopPositionsPx.length) {
      return '';
    }

    let path = `M ${stopPositionsPx[0]} ${getWaveY(stopPositionsPx[0])}`;

    for (let i = 1; i < stopPositionsPx.length; i += 1) {
      const prevX = stopPositionsPx[i - 1];
      const currentX = stopPositionsPx[i];
      const midX = (prevX + currentX) / 2;
      const controlY = baselineY + amplitude * (i % 2 === 0 ? -1 : 1);
      path += ` C ${midX} ${controlY}, ${midX} ${controlY}, ${currentX} ${getWaveY(currentX)}`;
    }

    return path;
  }, [stopPositionsPx, stationSpacing, amplitude, baselineY]);

  const [selectedStopIndex, setSelectedStopIndex] = useState(safeCurrentStopIndex);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [manualProgressIndex, setManualProgressIndex] = useState(safeCurrentStopIndex);
  const [confirmState, setConfirmState] = useState('idle');
  const [celebrationMessage, setCelebrationMessage] = useState(null);
  const scrollRef = useRef(null);
  const stopRefs = useRef([]);
  const highlightFirstSegmentPath =
    stopPositionsPx.length >= 2 ? buildSegmentPath(0, 1) : '';

  useEffect(() => {
    setManualProgressIndex((prev) =>
      prev < safeCurrentStopIndex ? safeCurrentStopIndex : prev
    );
    setSelectedStopIndex(safeCurrentStopIndex);
    setIsDetailOpen(false);
    setConfirmState('idle');
  }, [safeCurrentStopIndex]);

  useEffect(() => {
    const node = stopRefs.current[selectedStopIndex];
    if (node && node.scrollIntoView) {
      node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    setConfirmState('idle');
  }, [selectedStopIndex]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIsDetailOpen(false);
      }
    };

    if (isDetailOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }

    return undefined;
  }, [isDetailOpen]);

  const stageStart = currentStop.startWeek;
  const stageEnd = nextStop ? nextStop.startWeek : stageStart + 1;
  const totalStageDays = Math.max((stageEnd - stageStart) * 7, 1);
  const currentStageDays =
    Math.max(currentWeekNumber - stageStart, 0) * 7 + Math.max(currentWeekDays, 0);
  const betweenProgress = Math.min(totalStageDays ? currentStageDays / totalStageDays : 0, 1);

  const baseStagePositionPx = useMemo(() => {
    if (!stopPositionsPx.length) {
      return stationBaseOffset;
    }

    const basePosition = stopPositionsPx[safeCurrentStopIndex] ?? stationBaseOffset;
    const nextPosition =
      stopPositionsPx[safeCurrentStopIndex + 1] ?? basePosition + stationSpacing;
    return basePosition + (nextPosition - basePosition) * betweenProgress;
  }, [
    stopPositionsPx,
    safeCurrentStopIndex,
    stationBaseOffset,
    stationSpacing,
    betweenProgress,
  ]);

  const initialCartPx = useMemo(() => {
    if (!stopPositionsPx.length) {
      return baseStagePositionPx;
    }

    if (manualProgressIndex > safeCurrentStopIndex) {
      const manualIndex = Math.min(manualProgressIndex, stopPositionsPx.length - 1);
      return stopPositionsPx[manualIndex] ?? baseStagePositionPx;
    }

    return baseStagePositionPx;
  }, [stopPositionsPx, manualProgressIndex, safeCurrentStopIndex, baseStagePositionPx]);

  const [cartPosition, setCartPosition] = useState(() => ({
    px: initialCartPx,
    y: getWaveY(initialCartPx),
  }));
  const cartPositionRef = useRef(cartPosition);
  const cartAnimationRef = useRef(null);

  useEffect(() => {
    cartPositionRef.current = cartPosition;
  }, [cartPosition]);

  useEffect(() => {
    if (!stopPositionsPx.length) {
      return undefined;
    }

    const manualIndex = Math.min(manualProgressIndex, stopPositionsPx.length - 1);
    const manualAhead = manualProgressIndex > safeCurrentStopIndex;
    const manualTargetPx = stopPositionsPx[manualIndex] ?? baseStagePositionPx;
    const targetPx = manualAhead ? manualTargetPx : manualProgressIndex < safeCurrentStopIndex
      ? stopPositionsPx[manualProgressIndex] ?? baseStagePositionPx
      : baseStagePositionPx;
    const startPx = cartPositionRef.current.px;

    if (Math.abs(targetPx - startPx) < 0.5) {
      const y = getWaveY(targetPx);
      setCartPosition({ px: targetPx, y });
      return undefined;
    }

    const distance = Math.abs(targetPx - startPx);
    const movingForward = targetPx > startPx;
    const baseDuration = movingForward ? 5400 : 4800;
    const duration = Math.max(baseDuration, distance * 12);
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      const px = startPx + (targetPx - startPx) * eased;
      const y = getWaveY(px);
      setCartPosition({ px, y });

      if (progress < 1) {
        cartAnimationRef.current = requestAnimationFrame(animate);
      } else {
        cartPositionRef.current = { px, y };
      }
    };

    if (cartAnimationRef.current) {
      cancelAnimationFrame(cartAnimationRef.current);
    }
    cartAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (cartAnimationRef.current) {
        cancelAnimationFrame(cartAnimationRef.current);
      }
    };
  }, [
    stopPositionsPx,
    manualProgressIndex,
    safeCurrentStopIndex,
    baseStagePositionPx,
    getWaveY,
  ]);

  const completedCount = stops.filter((stop) => stop.startWeek <= currentWeekNumber).length;
  const nextTitle = nextStop ? nextStop.title : 'Snuggle Season';
  const nextDescription = nextStop
    ? nextStop.description
    : 'Time to soak in every precious cuddle and follow-up care.';
  const selectedStop = stops[selectedStopIndex];
  const selectedNextStop = stops[selectedStopIndex + 1];
  const selectedStatus =
    selectedStopIndex < safeCurrentStopIndex
      ? 'Complete'
      : selectedStopIndex === safeCurrentStopIndex
        ? 'Currently visiting'
        : 'Up ahead';
  const detailStatusLabel =
    selectedStopIndex < manualProgressIndex
      ? 'Milestone celebrated'
      : selectedStopIndex === safeCurrentStopIndex
        ? 'In bloom right now'
        : 'Waiting in the wings';
  const alreadyUnlocked = selectedStopIndex < manualProgressIndex;
  const canConfirmStop =
    selectedStopIndex === manualProgressIndex && selectedStopIndex <= safeCurrentStopIndex;
  const canRevertStop = manualProgressIndex === selectedStopIndex + 1;
  const blockedStop = selectedStopIndex > manualProgressIndex;

  const handleSelectStop = (index) => {
    setSelectedStopIndex(index);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setConfirmState('idle');
  };

  const handleConfirmMilestone = () => {
    if (!canConfirmStop) {
      setIsDetailOpen(false);
      return;
    }

    setManualProgressIndex((prev) => Math.min(prev + 1, stops.length - 1));
    setConfirmState('confirmed');
    setCelebrationMessage(
      `Milestone "${selectedStop.title}" celebrated! ${
        selectedNextStop ? `Next up: ${selectedNextStop.title}.` : 'You’ve reached the final embrace.'
      }`
    );
  };

  const handleRevertMilestone = () => {
    if (!canRevertStop) {
      return;
    }

    setManualProgressIndex(selectedStopIndex);
    setConfirmState('reverted');
    setCelebrationMessage(
      `Milestone "${selectedStop.title}" marked as not yet completed. Your stroller is returning to this station.`
    );
  };
  useEffect(() => {
    if (!celebrationMessage) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setCelebrationMessage(null);
    }, 4500);

    return () => clearTimeout(timeout);
  }, [celebrationMessage]);

  const handleWheelPan = (event) => {
    if (!scrollRef.current) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      scrollRef.current.scrollBy({ left: event.deltaY, behavior: 'smooth' });
    }
  };

  return (
    <div className="baby-express-card">
      <div className="baby-express-header">
        <div>
          <h3>Baby Express Journey</h3>
          <p>Swipe along the magical tracks to peek at every sparkling milestone.</p>
        </div>
        <div className="baby-express-meta">
          <span className="meta-label">Due Date</span>
          <span className="meta-value">{formattedDueDate}</span>
          <span className="meta-caption">
            {nextStop ? `Next stop: ${nextStop.title}` : 'Arrival time ready!'}
          </span>
        </div>
      </div>

      <div className="baby-express-track">
        {celebrationMessage && (
          <div className="express-celebration-toast">{celebrationMessage}</div>
        )}
        <p className="track-hint">Trace the starlit path to feel what baby is experiencing next.</p>
        <div className="express-scroll" ref={scrollRef} onWheel={handleWheelPan}>
          <div
            className="express-track-inner"
            style={{ width: `${Math.max(trackWidthPx, 1_080)}px` }}
          >
            <svg
              className="express-track-snake"
              viewBox={`0 0 ${Math.max(trackWidthPx, 1_080)} 260`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="expressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffb347" />
                  <stop offset="25%" stopColor="#ff77a9" />
                  <stop offset="50%" stopColor="#9a6bff" />
                  <stop offset="75%" stopColor="#5ec6ff" />
                  <stop offset="100%" stopColor="#7cffb2" />
                </linearGradient>
                <filter id="expressGlow" x="-60" y="-60" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="22" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {snakePath && (
                <path
                  d={snakePath}
                  fill="none"
                  stroke="rgba(26, 20, 54, 0.8)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {snakePath && (
                <path
                  d={snakePath}
                  fill="none"
                  stroke="url(#expressGradient)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#expressGlow)"
                  style={{ mixBlendMode: 'screen' }}
                />
              )}
              {highlightFirstSegmentPath && (
                <path
                  d={highlightFirstSegmentPath}
                  fill="none"
                  stroke="url(#expressGradient)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#expressGlow)"
                  style={{ mixBlendMode: 'screen' }}
                />
              )}
            </svg>

            {stops.map((stop, index) => {
              const stopClass =
                index < manualProgressIndex
                  ? 'reached'
                  : index === manualProgressIndex
                    ? 'current'
                    : 'upcoming';

              return (
              <button
                key={stop.id}
                ref={(node) => {
                  stopRefs.current[index] = node;
                }}
                  className={`express-stop ${stopClass}`}
                style={{
                  left: `${stopPositionsPx[index]}px`,
                  top: `${getWaveY(stopPositionsPx[index]) - stopVerticalOffset}px`,
                }}
                type="button"
                onClick={() => handleSelectStop(index)}
              >
                <div className="stop-icon" aria-hidden>
                  {stop.icon}
                </div>
                <div className="stop-label">
                  <span>{stop.title}</span>
                  <span className="stop-description">{stop.description}</span>
                  <span className="stop-indicator">Tap to explore ✨</span>
                </div>
              </button>
              );
            })}

            <div
              className="express-cart"
              style={{
                left: `${cartPosition.px}px`,
                top: `${cartPosition.y - cartVerticalOffset}px`,
              }}
            >
              <div className="stroller-beacon" aria-hidden />
              <div className="stroller-body">
                <div className="stroller-canopy" />
                <div className="stroller-seat">
                  <span className="stroller-emoji" role="img" aria-label="Baby">
                    👶
                  </span>
                </div>
                <div className="stroller-handle" />
                <div className="stroller-wheel left" />
                <div className="stroller-wheel right" />
              </div>
              <div className="cart-shadow" />
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <div
          className="express-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="express-detail-title"
          onClick={handleCloseDetail}
        >
          <div
            className="express-detail-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="express-detail-close"
              onClick={handleCloseDetail}
              aria-label="Close milestone details"
            >
              ✕
            </button>
            <div className="express-detail-icon" aria-hidden>
              {selectedStop.icon}
            </div>
            <h4 id="express-detail-title">{selectedStop.title}</h4>
            <p className="express-detail-status">{detailStatusLabel}</p>
            <p className="express-detail-description">{selectedStop.description}</p>
            {confirmState === 'confirmed' && (
              <p className="express-detail-success">
                Milestone celebrated! Your stroller is rolling toward{' '}
                {selectedNextStop ? selectedNextStop.title : 'a cozy snuggle finale'}.
              </p>
            )}
            {confirmState === 'reverted' && (
              <p className="express-detail-revert">
                Journey rolled back to this stop. Confirm again when you’re ready to move forward.
              </p>
            )}
            {canConfirmStop && confirmState !== 'confirmed' && (
              <p className="express-detail-confirm-tip">
                Have you visited this milestone? Confirm to glide your stroller into this station.
              </p>
            )}
            {blockedStop && confirmState !== 'confirmed' && (
              <p className="express-detail-blocked">
                Unlock this stop by celebrating the milestones in order. Confirm the previous moments first.
              </p>
            )}
            {alreadyUnlocked && confirmState !== 'confirmed' && !canRevertStop && (
              <p className="express-detail-confirm-tip completed">
                Already cherished — thank you for honoring this moment!
              </p>
            )}
            <div className="express-detail-future">
              <span className="detail-label">Looking ahead</span>
              <p>{selectedStop.future}</p>
            </div>
            {selectedNextStop && (
              <div className="express-detail-next">
                <span className="detail-label">Soon on the horizon</span>
                <p>
                  {selectedNextStop.title}: {selectedNextStop.description}
                </p>
              </div>
            )}
            <div className="express-detail-actions">
              <button
                type="button"
                className="detail-primary"
                onClick={handleConfirmMilestone}
                disabled={!canConfirmStop || confirmState === 'confirmed'}
              >
                Mark as completed
              </button>
              <button
                type="button"
                className="detail-ghost"
                onClick={handleRevertMilestone}
                disabled={!canRevertStop}
              >
                Mark as not completed
              </button>
              <button type="button" className="detail-secondary" onClick={handleCloseDetail}>
                Not yet, keep scrolling
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="baby-express-footer">
        <div className="express-summary">
          <p className="summary-label">Stops savoured</p>
          <p className="summary-value">
            {completedCount}/{totalStops}
          </p>
          <p className="summary-note">Every milestone is a little celebration of you both.</p>
        </div>
        <div className="express-next">
          <div className="express-next-header">
            <p className="next-label">{selectedStatus}</p>
            <h4>{selectedStop.title}</h4>
          </div>
          <p className="next-text">{selectedStop.description}</p>
          <div className="express-next-future">
            <span className="future-label">Looking ahead</span>
            <p>{selectedStop.future}</p>
          </div>
          {selectedNextStop ? (
            <div className="express-next-preview">
              <span className="preview-label">Soon on the horizon</span>
              <p>
                {selectedNextStop.title}: {selectedNextStop.description}
              </p>
            </div>
          ) : (
            <div className="express-next-preview">
              <span className="preview-label">Soon on the horizon</span>
              <p>Every station reached—time to enjoy the snuggles!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BabyExpress;


