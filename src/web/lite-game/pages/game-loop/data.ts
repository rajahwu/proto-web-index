// Loop prototype – static data (vessels, card pools, level metadata)

import type { Vessel, DraftCard } from './types';

export const vessels: Vessel[] = [
  {
    id: 'seraph',
    name: 'Seraph',
    desc: 'the burning ones',
    perk: '+1 Light per level',
    icon: '◇',
    color: 'var(--light)',
    lightBias: 70,
    darkBias: 30,
    startLight: 1,
    startDark: 0,
    levelBonus: 'light',
  },
  {
    id: 'shadow',
    name: 'Shadow',
    desc: 'the hidden ones',
    perk: '+1 Dark per level',
    icon: '◈',
    color: 'var(--dark)',
    lightBias: 25,
    darkBias: 75,
    startLight: 0,
    startDark: 1,
    levelBonus: 'dark',
  },
  {
    id: 'exile',
    name: 'Exile',
    desc: 'the displaced ones',
    perk: 'Choose +1 L or D',
    icon: '◇',
    color: 'var(--neutral)',
    lightBias: 50,
    darkBias: 50,
    startLight: 0,
    startDark: 0,
    levelBonus: 'choice',
  },
  {
    id: 'penitent',
    name: 'Penitent',
    desc: 'the bowed ones',
    perk: '+1 HP per level',
    icon: '▽',
    color: 'var(--amber)',
    lightBias: 60,
    darkBias: 40,
    startLight: 1,
    startDark: 0,
    levelBonus: 'heal',
  },
  {
    id: 'rebel',
    name: 'Rebel',
    desc: 'the defiant ones',
    perk: '+2 PTS per level',
    icon: '△',
    color: 'var(--danger)',
    lightBias: 35,
    darkBias: 65,
    startLight: 0,
    startDark: 1,
    levelBonus: 'points',
  },
];

export const cardPool: { light: DraftCard[]; dark: DraftCard[] } = {
  light: [
    { name: 'Sanctum Ward', effect: '+2 Light', light: 2, dark: 0 },
    { name: 'Grace Thread', effect: '+1 Light', light: 1, dark: 0 },
    { name: 'Beacon Pulse', effect: '+3 Light', light: 3, dark: 0 },
    { name: 'Covenant Seal', effect: '+1 Light, +1 HP', light: 1, dark: 0, heal: 1 },
  ],
  dark: [
    { name: "Root-Cutter's Venom", effect: '+2 Dark', light: 0, dark: 2 },
    { name: 'Veil Fragment', effect: '+1 Dark', light: 0, dark: 1 },
    { name: 'Abyssal Echo', effect: '+3 Dark', light: 0, dark: 3 },
    { name: "Smuggler's Cut", effect: '+1 Dark, +2 PTS', light: 0, dark: 1, points: 2 },
  ],
};

export const levelNames = [
  'The Threshold',
  'The Hollow',
  'The Furnace',
  'The Archive',
  'Dudael Core',
];

export const levelTypes = [
  'Puzzle',
  'Top-Down',
  'Platformer',
  'Puzzle',
  'Survival',
];

/** Fisher-Yates shuffle (immutable — returns new array) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
