export interface CharacterOption {
  class: 'seraph' | 'shadow' | 'exile';
  displayName: string;
  description: string;
  startingBonus: string;
  themeColor: string; // for UI styling
}

export const CHARACTERS: CharacterOption[] = [
  {
    class: 'seraph',
    displayName: 'The Seraph',
    description: 'Born of radiant light, blessed with clarity and grace. Your path illuminates the way forward.',
    startingBonus: '+1 Light at level start',
    themeColor: 'gold',
  },
  {
    class: 'shadow',
    displayName: 'The Shadow',
    description: 'Forged in twilight\'s embrace, master of hidden paths. Darkness reveals what light conceals.',
    startingBonus: '+1 Dark at level start',
    themeColor: 'purple',
  },
  {
    class: 'exile',
    displayName: 'The Exile',
    description: 'Wanderer between worlds, balanced in duality. Neither light nor dark claims dominion over you.',
    startingBonus: 'Choose +1 Light or +1 Dark each level',
    themeColor: 'slate',
  },
];
