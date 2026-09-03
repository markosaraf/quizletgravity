/**
 * Gravity constants — extracted verbatim from the original
 * gravity.1e63caa21a5af6d5.js bundle (GravityConstants module).
 */

export const GAME_STATES = {
  INTRO: 'INTRO',
  OPTIONS: 'OPTIONS',
  DIRECTIONS: 'DIRECTIONS',
  LOADING: 'LOADING',
  FREE_FALL: 'FREE_FALL',
  LEVEL_UP: 'LEVEL_UP',
  COPY_ANSWER: 'COPY_ANSWER',
  GAME_OVER: 'GAME_OVER',
  PAUSED: 'PAUSED',
  ERROR_NO_AVAILABLE_TERMS: 'ERROR_NO_AVAILABLE_TERMS',
} as const;

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

export const DIFFICULTY = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT',
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export type Side = 'word' | 'definition' | 'random';

// --- numeric constants (minified names preserved in comments) ---
export const LOAD_PERCENT_STEP_1_MS = 300; // c
export const LOAD_PERCENT_STEP_MS = 2000; // u
export const MIN_TERM_INTERVAL = 500; // p
export const INITIAL_TERM_LIFE = 17000; // h (17s)
export const MIN_TERM_LIFE = 1000; // m
export const TIMER_TICK = 100; // g
export const INITIAL_TERM_DELAY = 1000; // f
export const COPY_FOCUS_DELAY = 500; // _
export const COPY_SUBMIT_DEBOUNCE = 400; // y
export const COPY_SUBMIT_INITIAL_DELAY = 1500; // v
export const RESIZE_DEBOUNCE = 300; // b
export const TIP_SHOW_MS = 3000; // S
export const TIP_AFTER_MS = 12000; // E
export const LEVEL_UP_MS = 2300; // j
export const INCORRECT_POINTS = -10; // x
export const MISSES_ALLOWED = 2; // T (game over threshold)
export const GRAVITY_STEP = 0.2; // w
export const TERMS_PER_LEVEL = 7; // C
export const GRAVITY_START: Record<Difficulty, number> = {
  // L
  BEGINNER: 9.8,
  INTERMEDIATE: 9.8,
  EXPERT: 11,
};
export const TERM_INTERVAL_START: Record<Difficulty, number> = {
  // k
  BEGINNER: 17000,
  INTERMEDIATE: 17000,
  EXPERT: 3500,
};
export const SKIP_KEY = 'esc'; // N
export const DEFAULT_DIFFICULTY: Difficulty = 'INTERMEDIATE'; // D
export const SHOW_WHICH_SIDE_STORAGE_KEY = 'gravityShowWhichSide'; // A
export const PLANET_COUNT = 10;

// --- score formulas (Be in the original store) ---
export const correctAnswerPointsFormula = (
  consecutiveCorrect: number,
  gravityConstant: number,
): number =>
  20 * consecutiveCorrect + 150 * (1 + Math.round((gravityConstant - 9.8) / 0.2));

export const gravityIncreaseFormula: Record<Difficulty, (g: number) => number> = {
  BEGINNER: (g) => g,
  INTERMEDIATE: (g) => g + GRAVITY_STEP,
  EXPERT: (g) => g + GRAVITY_STEP,
};

export const newTermIntervalFormula: Record<
  Difficulty,
  (interval: number) => number
> = {
  BEGINNER: (i) => Math.max(0.8 * i, MIN_TERM_INTERVAL),
  INTERMEDIATE: (i) => Math.max(0.8 * i, MIN_TERM_INTERVAL),
  EXPERT: (i) => Math.max(0.9 * i, MIN_TERM_INTERVAL),
};

// --- term sizing (GravityTerm view) ---
const FONT_SCALE = 1.5; // Ae
export function maxTextLengthFactor(lang: string): number {
  // approximation of utils.FontSize.getLanguageFontSizeScale
  const cjk = /^(zh|ja|ko|th|vi)/i.test(lang || 'en');
  return cjk ? 0.6 : 1;
}

export function getMaxTextLength(promptLang: string, hasImage: boolean): number {
  return (hasImage ? 140 : 190) * maxTextLengthFactor(promptLang);
}

export function getTermSize(textLength: number, maxLen: number, hasImage: boolean): number {
  if (hasImage) return 364;
  const ratio = textLength / maxLen;
  return Math.max(180, Math.min(364, Math.sqrt(132496 * ratio) + 20));
}

// --- planet helpers (original: _e / ye / be) ---
export const planetLevelFor = (level: number): number =>
  ((level - 1) % PLANET_COUNT) + 1;

export const planetSize = (windowWidth: number): number => 2 * windowWidth;

export function shouldShowPlanet(currentLevel: number, planetLevel: number): boolean {
  const cur = planetLevelFor(currentLevel);
  return (
    planetLevel === cur ||
    planetLevel === planetLevelFor(currentLevel + 1) ||
    planetLevel === planetLevelFor(currentLevel + 2)
  );
}

export const PLANET_ASSET_PATHS: Record<number, string> = {
  1: '/assets/gravity/planets/level1.svg',
  2: '/assets/gravity/planets/level2.svg',
  3: '/assets/gravity/planets/level3.svg',
  4: '/assets/gravity/planets/level4.svg',
  5: '/assets/gravity/planets/level5.svg',
  6: '/assets/gravity/planets/level6.svg',
  7: '/assets/gravity/planets/level7.svg',
  8: '/assets/gravity/planets/level8.svg',
  9: '/assets/gravity/planets/level9.svg',
  10: '/assets/gravity/planets/level10.svg',
};
