import { differenceInDays, addWeeks, startOfWeek } from 'date-fns';

/**
 * Calculate due date from Last Menstrual Period (LMP)
 * Standard calculation: LMP + 280 days (40 weeks)
 */
export function calculateDueDate(lmpDate) {
  const lmp = new Date(lmpDate);
  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
  return dueDate;
}

/**
 * Calculate current pregnancy week from due date
 */
export function calculateCurrentWeek(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const daysPregnant = 280 - differenceInDays(due, today);
  const weeks = Math.floor(daysPregnant / 7);
  const days = daysPregnant % 7;
  
  if (weeks < 0) {
    return { weeks: 40, days: 0, isOverdue: true };
  }
  
  return { weeks, days, isOverdue: false };
}

/**
 * Calculate conception date from due date
 */
export function calculateConceptionDate(dueDate) {
  const due = new Date(dueDate);
  const conception = new Date(due);
  conception.setDate(conception.getDate() - 266); // 38 weeks from conception
  return conception;
}

/**
 * Get trimester from current week
 */
export function getTrimester(week) {
  if (week < 13) return 1;
  if (week < 28) return 2;
  return 3;
}

/**
 * Get baby size comparison for current week
 */
export function getBabySize(week) {
  const sizes = {
    4: { size: 'Poppy seed', length: '0.04', weight: '0.5' },
    5: { size: 'Sesame seed', length: '0.13', weight: '0.5' },
    6: { size: 'Lentil', length: '0.25', weight: '0.5' },
    7: { size: 'Blueberry', length: '0.51', weight: '0.5' },
    8: { size: 'Kidney bean', length: '1.27', weight: '1' },
    9: { size: 'Grape', length: '2.54', weight: '2' },
    10: { size: 'Kumquat', length: '3.18', weight: '4' },
    11: { size: 'Fig', length: '4.57', weight: '7' },
    12: { size: 'Lime', length: '6.35', weight: '14' },
    13: { size: 'Peach', length: '7.62', weight: '23' },
    14: { size: 'Lemon', length: '9.14', weight: '43' },
    15: { size: 'Apple', length: '10.16', weight: '70' },
    16: { size: 'Avocado', length: '11.68', weight: '100' },
    17: { size: 'Pear', length: '13.34', weight: '140' },
    18: { size: 'Sweet potato', length: '14.48', weight: '190' },
    19: { size: 'Mango', length: '15.75', weight: '240' },
    20: { size: 'Banana', length: '16.76', weight: '300' },
    21: { size: 'Carrot', length: '18.29', weight: '360' },
    22: { size: 'Papaya', length: '19.05', weight: '430' },
    23: { size: 'Grapefruit', length: '20.32', weight: '500' },
    24: { size: 'Corn', length: '21.59', weight: '600' },
    25: { size: 'Cauliflower', length: '22.86', weight: '660' },
    26: { size: 'Butternut squash', length: '23.62', weight: '760' },
    27: { size: 'Head of lettuce', length: '36.83', weight: '875' },
    28: { size: 'Eggplant', length: '37.85', weight: '1000' },
    29: { size: 'Butternut squash', length: '38.86', weight: '1150' },
    30: { size: 'Cabbage', length: '39.88', weight: '1300' },
    31: { size: 'Coconut', length: '41.40', weight: '1500' },
    32: { size: 'Squash', length: '42.67', weight: '1700' },
    33: { size: 'Pineapple', length: '43.94', weight: '1900' },
    34: { size: 'Cantaloupe', length: '45.21', weight: '2100' },
    35: { size: 'Honeydew melon', length: '46.48', weight: '2380' },
    36: { size: 'Romaine lettuce', length: '47.50', weight: '2620' },
    37: { size: 'Swiss chard', length: '48.51', weight: '2850' },
    38: { size: 'Leek', length: '49.53', weight: '3080' },
    39: { size: 'Mini watermelon', length: '50.55', weight: '3300' },
    40: { size: 'Small pumpkin', length: '51.05', weight: '3500' },
  };
  
  return sizes[week] || { size: 'Growing baby', length: 'N/A', weight: 'N/A' };
}

/**
 * Get weekly milestone information
 */
export function getWeeklyMilestone(week) {
  const milestones = {
    4: 'Neural tube begins forming',
    5: 'Heart begins beating',
    6: 'Arms and legs buds appear',
    8: 'Baby begins moving',
    12: 'All organs are formed',
    16: 'Baby can hear sounds',
    20: 'Halfway point! Baby can taste',
    24: 'Baby can respond to touch',
    28: 'Baby opens eyes and blinks',
    32: 'Baby practices breathing',
    36: 'Baby is gaining weight rapidly',
    40: 'Due date! Baby is ready to be born',
  };
  
  return milestones[week] || null;
}

/**
 * Additional weekly development narratives
 */
const weekDevelopment = {
  4: {
    headline: 'Tiny beginnings',
    details: [
      'Embryo is settling into the uterus and forming the placenta.',
      'Neural tube is the foundation of baby’s brain and spinal cord.',
    ],
  },
  8: {
    headline: 'Little fingers forming',
    details: [
      'Facial features like eyelids and tip of the nose are emerging.',
      'Baby starts gentle, almost imperceptible movements.',
    ],
  },
  12: {
    headline: 'Listening in',
    details: [
      'Baby’s heartbeat can often be heard with a Doppler.',
      'Digestive system starts to practice small movements.',
    ],
  },
  16: {
    headline: 'Senses awaken',
    details: [
      'Tiny taste buds and hearing pathways are tuning in.',
      'Baby may react to loud sounds or your laughter.',
    ],
  },
  20: {
    headline: 'Halfway milestone',
    details: [
      'Baby can swallow and is building meconium in their tummy.',
      'Fine hair (lanugo) covers the body for warmth.',
    ],
  },
  24: {
    headline: 'Responsive explorer',
    details: [
      'Lungs practice rhythmic inhaling movements.',
      'Footprints and fingerprints are fully established.',
    ],
  },
  28: {
    headline: 'Bright eyes',
    details: [
      'Eyes open and close; baby can sense changes in light.',
      'Brain is adding billions of neurons and REM sleep begins.',
    ],
  },
  32: {
    headline: 'Layers of softness',
    details: [
      'Baby adds fat layers for temperature regulation.',
      'Bones are firm except for flexible skull plates.',
    ],
  },
  36: {
    headline: 'Final flourishes',
    details: [
      'Baby practices breathing and sucking all day.',
      'Most systems are mature; baby is gaining around 28g a day.',
    ],
  },
};

const trimesterDevelopmentFallback = {
  1: {
    headline: 'Foundations forming',
    details: [
      'Organs, limbs, and facial features are taking shape.',
      'Placenta is developing to nourish baby all pregnancy long.',
    ],
  },
  2: {
    headline: 'Growing in motion',
    details: [
      'Baby’s senses sharpen and movements become coordinated.',
      'They can hear your voice and respond to gentle touch.',
    ],
  },
  3: {
    headline: 'Preparing for arrival',
    details: [
      'Baby gains weight quickly and practices breathing.',
      'Lungs and brain finalize critical development.',
    ],
  },
};

/**
 * Weekly experience prompts for the birthing parent
 */
const weekExperience = {
  6: {
    body: 'You might notice stronger sense of smell and gentle fatigue.',
    soothe: 'Tiny, frequent snacks and rest breaks can help steady nausea.',
  },
  14: {
    body: 'Energy often returns as the placenta takes over hormone production.',
    soothe: 'Plan a walk or stretch to enjoy the second trimester boost.',
  },
  22: {
    body: 'Baby may respond when you press lightly on your belly.',
    soothe: 'Sing or talk—baby recognizes your voice as a calming rhythm.',
  },
  30: {
    body: 'Back aches can increase as baby gains weight.',
    soothe: 'Support pillows and pelvic tilts offer gentle relief.',
  },
  37: {
    body: 'Baby is settling lower which might change your breathing and stride.',
    soothe: 'Practice slow belly breathing and elevate your feet when resting.',
  },
};

const trimesterExperienceFallback = {
  1: {
    body: 'Hormone shifts can bring waves of nausea, mood changes, and tender breasts.',
    soothe: 'Stay hydrated, nibble on crackers, and give yourself grace to rest often.',
  },
  2: {
    body: 'Many parents feel a burst of energy and begin to feel movement.',
    soothe: 'Use the momentum to build nourishing routines and gentle exercise.',
  },
  3: {
    body: 'Discomforts like swelling, sleep changes, and Braxton Hicks may appear.',
    soothe: 'Lean on support pillows, stay hydrated, and practice relaxation breaths.',
  },
};

/**
 * Weekly care focus prompts
 */
const weekCareFocus = {
  10: {
    appointments: ['Schedule your first major prenatal screening if recommended.'],
    questions: ['Ask about genetic testing options and timing.'],
    selfCare: ['Create a bedtime ritual that helps you wind down.'],
  },
  18: {
    appointments: ['Anatomy scan often happens between weeks 18-22.'],
    questions: ['Discuss what to expect during the scan and how results are shared.'],
    selfCare: ['Stretch hips and lower back to ease posture shifts.'],
  },
  26: {
    appointments: ['Glucose screening may be scheduled soon.'],
    questions: ['Talk about signs of preterm labor and when to call your provider.'],
    selfCare: ['Prep a snack basket for those nighttime hunger cues.'],
  },
  34: {
    appointments: ['Discuss birth preferences and hospital bag essentials.'],
    questions: ['Clarify induction policies and postpartum support.'],
    selfCare: ['Plan a restful evening ritual with warm baths or gentle yoga.'],
  },
  38: {
    appointments: ['Weekly check-ins often start now—keep notes of baby’s movements.'],
    questions: ['Review signs of labor and when to head to your birthing place.'],
    selfCare: ['Practice relaxation techniques you’ll use during early labor.'],
  },
};

const trimesterCareFallback = {
  1: {
    appointments: ['Book your initial prenatal visits and ultrasound.'],
    questions: ['Ask about approved vitamins, meds, and lifestyle adjustments.'],
    selfCare: ['Focus on rest, hydration, and gentle movement when possible.'],
  },
  2: {
    appointments: ['Plan for mid-pregnancy screenings and anatomy scan.'],
    questions: ['Discuss travel plans, exercise, and any new symptoms.'],
    selfCare: ['Build routines: stretching, prenatal yoga, journaling baby movements.'],
  },
  3: {
    appointments: ['Finalize birth plan, pediatrician choice, and postpartum support.'],
    questions: ['Ask about labor signs, breastfeeding prep, and hospital procedures.'],
    selfCare: ['Prioritize sleep, nourishing meals, and leaning on your support system.'],
  },
};

export function getWeekDevelopment(week) {
  const trimester = getTrimester(week);
  return weekDevelopment[week] || trimesterDevelopmentFallback[trimester];
}

export function getWeekExperience(week) {
  const trimester = getTrimester(week);
  return weekExperience[week] || trimesterExperienceFallback[trimester];
}

export function getWeekCareFocus(week) {
  const trimester = getTrimester(week);
  return weekCareFocus[week] || trimesterCareFallback[trimester];
}

/**
 * Calculate ovulation date and fertile window from LMP and cycle length
 */
export function calculateOvulationWindow(lmpDate, cycleLength = 28) {
  const lmp = new Date(lmpDate);
  const ovulationDay = new Date(lmp);
  ovulationDay.setDate(ovulationDay.getDate() + (cycleLength - 14)); // Ovulation typically occurs 14 days before next period
  
  const fertileStart = new Date(ovulationDay);
  fertileStart.setDate(fertileStart.getDate() - 5); // 5 days before ovulation
  
  const fertileEnd = new Date(ovulationDay);
  fertileEnd.setDate(fertileEnd.getDate() + 1); // Day after ovulation
  
  const nextPeriod = new Date(lmp);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  
  return {
    ovulationDate: ovulationDay,
    fertileStart: fertileStart,
    fertileEnd: fertileEnd,
    nextPeriod: nextPeriod,
    peakDays: {
      day1: new Date(fertileStart),
      day2: new Date(fertileStart.getTime() + 24 * 60 * 60 * 1000),
      day3: new Date(fertileStart.getTime() + 48 * 60 * 60 * 1000),
      day4: new Date(fertileStart.getTime() + 72 * 60 * 60 * 1000),
      day5: new Date(fertileStart.getTime() + 96 * 60 * 60 * 1000),
      day6: ovulationDay,
    }
  };
}

/**
 * Check if a given date falls within the fertile window
 */
export function checkDateInFertileWindow(date, lmpDate, cycleLength = 28) {
  const window = calculateOvulationWindow(lmpDate, cycleLength);
  const checkDate = new Date(date);
  
  return checkDate >= window.fertileStart && checkDate <= window.fertileEnd;
}

/**
 * Calculate probability of conception based on date relative to ovulation
 */
export function getConceptionProbability(date, lmpDate, cycleLength = 28) {
  const window = calculateOvulationWindow(lmpDate, cycleLength);
  const checkDate = new Date(date);
  const daysFromOvulation = Math.round((checkDate - window.ovulationDate) / (1000 * 60 * 60 * 24));
  
  // Scientific data about conception probability around ovulation
  const probabilityMap = {
    '-5': 10,   // 5 days before ovulation
    '-4': 15,   // 4 days before ovulation
    '-3': 20,   // 3 days before ovulation
    '-2': 25,   // 2 days before ovulation
    '-1': 30,   // 1 day before ovulation
    '0': 35,    // Ovulation day
    '1': 25,    // 1 day after ovulation
  };
  
  return probabilityMap[daysFromOvulation] || 0;
}

