import React, { useState } from 'react';
import './ExerciseCalendar.css';

const exerciseRoutines = {
  monday: {
    day: 'Monday',
    icon: '🌅',
    title: 'Gentle Morning Flow',
    exercises: [
      {
        name: 'Deep Breathing',
        duration: '5 min',
        description: 'Sit comfortably and practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 4.',
        benefits: 'Reduces stress, improves oxygen flow to baby',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Neck & Shoulder Rolls',
        duration: '3 min',
        description: 'Slowly roll your neck in circles, then your shoulders. Repeat 5 times each direction.',
        benefits: 'Relieves tension, improves posture',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Gentle Cat-Cow Stretch',
        duration: '5 min',
        description: 'On hands and knees, arch your back (cow), then round it (cat). Repeat 10 times.',
        benefits: 'Strengthens back, relieves pressure',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
  tuesday: {
    day: 'Tuesday',
    icon: '💪',
    title: 'Strength & Balance',
    exercises: [
      {
        name: 'Wall Push-ups',
        duration: '5 min',
        description: 'Stand facing a wall, place hands on wall at shoulder height. Push away and return. 10 reps.',
        benefits: 'Strengthens arms and chest safely',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Squats with Support',
        duration: '5 min',
        description: 'Hold onto a chair, lower into squat position, return to standing. 8-10 reps.',
        benefits: 'Strengthens legs and glutes',
        difficulty: 'Moderate',
        trimester: '1st & 2nd',
      },
      {
        name: 'Side Leg Lifts',
        duration: '5 min',
        description: 'Lie on your side, lift top leg slowly. 10 reps each side.',
        benefits: 'Strengthens hip muscles',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
  wednesday: {
    day: 'Wednesday',
    icon: '🧘',
    title: 'Yoga & Relaxation',
    exercises: [
      {
        name: 'Prenatal Yoga Flow',
        duration: '15 min',
        description: 'Gentle yoga poses adapted for pregnancy. Focus on breathing and gentle stretches.',
        benefits: 'Improves flexibility, reduces stress',
        difficulty: 'Moderate',
        trimester: 'All',
      },
      {
        name: 'Pelvic Tilts',
        duration: '5 min',
        description: 'Lie on back with knees bent. Tilt pelvis up, hold 5 seconds, release. 10 reps.',
        benefits: 'Strengthens core, relieves back pain',
        difficulty: 'Easy',
        trimester: '1st & 2nd',
      },
      {
        name: 'Meditation',
        duration: '10 min',
        description: 'Find a quiet space. Focus on your breath and visualize a healthy baby.',
        benefits: 'Reduces anxiety, promotes bonding',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
  thursday: {
    day: 'Thursday',
    icon: '🚶',
    title: 'Cardio & Movement',
    exercises: [
      {
        name: 'Brisk Walking',
        duration: '20 min',
        description: 'Walk at a comfortable pace. Maintain good posture and breathe naturally.',
        benefits: 'Improves cardiovascular health',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Arm Circles',
        duration: '3 min',
        description: 'Stand with arms extended. Make small circles, gradually increasing size. 10 each direction.',
        benefits: 'Improves circulation, strengthens shoulders',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Ankle Rotations',
        duration: '3 min',
        description: 'Sit comfortably, rotate ankles in circles. 10 times each direction, each foot.',
        benefits: 'Reduces swelling, improves circulation',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
  friday: {
    day: 'Friday',
    icon: '💃',
    title: 'Dance & Stretch',
    exercises: [
      {
        name: 'Gentle Dancing',
        duration: '10 min',
        description: 'Put on your favorite music and move gently. Focus on smooth, flowing movements.',
        benefits: 'Boosts mood, improves flexibility',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Hip Circles',
        duration: '5 min',
        description: 'Stand with hands on hips. Make slow circles with your hips. 10 each direction.',
        benefits: 'Relieves hip tension, prepares for birth',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Forward Fold (Modified)',
        duration: '5 min',
        description: 'Stand with feet hip-width. Bend knees slightly, fold forward. Hold 30 seconds.',
        benefits: 'Stretches hamstrings, relieves back',
        difficulty: 'Moderate',
        trimester: '1st & 2nd',
      },
    ],
  },
  saturday: {
    day: 'Saturday',
    icon: '🌊',
    title: 'Water & Flexibility',
    exercises: [
      {
        name: 'Water Walking',
        duration: '15 min',
        description: 'If pool access available, walk in shallow water. Otherwise, gentle stretching.',
        benefits: 'Low impact, reduces joint stress',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Seated Spinal Twist',
        duration: '5 min',
        description: 'Sit with legs extended. Twist gently to one side, hold 20 seconds. Repeat other side.',
        benefits: 'Improves spinal mobility',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Butterfly Stretch',
        duration: '5 min',
        description: 'Sit with soles of feet together. Gently press knees down. Hold 30 seconds.',
        benefits: 'Opens hips, improves flexibility',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
  sunday: {
    day: 'Sunday',
    icon: '☮️',
    title: 'Rest & Recovery',
    exercises: [
      {
        name: 'Rest Day',
        duration: 'Full Day',
        description: 'Take time to rest and recover. Light activities only if desired.',
        benefits: 'Allows body to recover and rebuild',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Gentle Stretching (Optional)',
        duration: '10 min',
        description: 'If you feel like moving, do gentle stretches. Listen to your body.',
        benefits: 'Maintains flexibility without strain',
        difficulty: 'Easy',
        trimester: 'All',
      },
      {
        name: 'Mindful Breathing',
        duration: '10 min',
        description: 'Practice deep, mindful breathing. Connect with your baby.',
        benefits: 'Reduces stress, promotes relaxation',
        difficulty: 'Easy',
        trimester: 'All',
      },
    ],
  },
};

function ExerciseCalendar({ currentWeek }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const currentDayKey = getCurrentDay();
  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
  };

  return (
    <div className="exercise-calendar">
      <div className="exercise-calendar-header">
        <h3>💪 Exercise Routine Calendar</h3>
        <p className="exercise-subtitle">Day-wise exercises tailored for your pregnancy journey</p>
      </div>

      <div className="exercise-week-grid">
        {weekDays.map((dayKey) => {
          const routine = exerciseRoutines[dayKey];
          const isToday = dayKey === currentDayKey;
          
          return (
            <div
              key={dayKey}
              className={`exercise-day-card ${isToday ? 'today' : ''} ${selectedDay === dayKey ? 'selected' : ''}`}
              onClick={() => setSelectedDay(selectedDay === dayKey ? null : dayKey)}
            >
              <div className="exercise-day-header">
                <span className="exercise-day-icon">{routine.icon}</span>
                <div>
                  <h4 className="exercise-day-name">{routine.day}</h4>
                  <p className="exercise-day-title">{routine.title}</p>
                </div>
                {isToday && <span className="today-badge">Today</span>}
              </div>
              
              {selectedDay === dayKey && (
                <div className="exercise-day-exercises">
                  {routine.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="exercise-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExerciseClick(exercise);
                      }}
                    >
                      <div className="exercise-item-header">
                        <span className="exercise-item-name">{exercise.name}</span>
                        <span className="exercise-item-duration">{exercise.duration}</span>
                      </div>
                      <p className="exercise-item-description">{exercise.description}</p>
                      <div className="exercise-item-tags">
                        <span className={`exercise-tag difficulty-${exercise.difficulty.toLowerCase()}`}>
                          {exercise.difficulty}
                        </span>
                        <span className="exercise-tag trimester">{exercise.trimester}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedExercise && (
        <div className="exercise-modal-overlay" onClick={closeExerciseModal}>
          <div className="exercise-modal" onClick={(e) => e.stopPropagation()}>
            <button className="exercise-modal-close" onClick={closeExerciseModal}>×</button>
            <div className="exercise-modal-content">
              <h2 className="exercise-modal-title">{selectedExercise.name}</h2>
              <div className="exercise-modal-meta">
                <span className="exercise-modal-duration">⏱️ {selectedExercise.duration}</span>
                <span className={`exercise-modal-difficulty difficulty-${selectedExercise.difficulty.toLowerCase()}`}>
                  {selectedExercise.difficulty}
                </span>
                <span className="exercise-modal-trimester">📅 {selectedExercise.trimester} Trimester</span>
              </div>
              <div className="exercise-modal-section">
                <h3>How to Do It</h3>
                <p>{selectedExercise.description}</p>
              </div>
              <div className="exercise-modal-section">
                <h3>Benefits</h3>
                <p>{selectedExercise.benefits}</p>
              </div>
              <div className="exercise-modal-tips">
                <h3>💡 Tips</h3>
                <ul>
                  <li>Listen to your body and stop if you feel any discomfort</li>
                  <li>Stay hydrated before, during, and after exercise</li>
                  <li>Wear comfortable, supportive clothing</li>
                  <li>Consult your doctor before starting any new exercise routine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseCalendar;

