export interface CharacterOption {
  class: 'seraph' | 'shadow' | 'exile';
  displayName: string;
  description: string;
  backstory: string;
  startingBonus: string;
  theme: 'light' | 'dark' | 'twilight'; 
}

export const CHARACTERS: CharacterOption[] = [
  {
    class: 'seraph',
    displayName: 'The Seraph',
    description: 'Light-focused. Seeks redemption, but on their own terms.',
    backstory: 'Once a guardian of the celestial gates, the Seraph questioned why light required such rigid enforcement. Fell not from corruption, but from compassion — believing grace should be offered, not earned.',
    startingBonus: '+1 Light per level',
    theme: 'light',
  },
  {
    class: 'shadow',
    displayName: 'The Shadow',
    description: 'Dark-focused. Seeks transformation and what lies beyond.',
    backstory: 'A scholar of forbidden knowledge, the Shadow delved into mysteries meant to remain hidden. Fell not from malice, but from curiosity — believing darkness held truths light refused to illuminate.',
    startingBonus: '+1 Dark per level',
    theme: 'dark',
  },
  {
    class: 'exile',
    displayName: 'The Exile',
    description: 'Balanced. Seeks understanding through duality.',
    backstory: 'Refused to choose a side during the celestial wars. Fell not from defiance, but from neutrality — believing neither light nor dark held absolute truth, only perspective.',
    startingBonus: 'Choose +1 Light or +1 Dark each level',
    theme: 'twilight',
  },
];