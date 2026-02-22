import type { Card } from '../../../types/lite-game';

interface CardDisplayProps {
  card: Card;
  onClaim: () => void;
  claimed: boolean;
}

export default function CardDisplay({ card, onClaim, claimed }: CardDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Card Name */}
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
        {card.name}
      </h2>

      {/* Card Description (Story Clue) */}
      <p className="text-slate-300 text-center italic text-lg">
        "{card.description}"
      </p>

      {/* Rewards Display */}
      <div className="flex justify-center gap-8">
        {card.light_reward > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-400"></div>
            <span className="text-2xl font-bold text-amber-400">
              +{card.light_reward}
            </span>
            <span className="text-slate-400">Light</span>
          </div>
        )}
        {card.dark_reward > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-400"></div>
            <span className="text-2xl font-bold text-purple-400">
              +{card.dark_reward}
            </span>
            <span className="text-slate-400">Dark</span>
          </div>
        )}
      </div>

      {/* Rarity Badge */}
      <div className="text-center">
        <span className={`
          px-3 py-1 rounded-full text-xs font-semibold uppercase
          ${card.rarity === 'common' ? 'bg-slate-700 text-slate-300' : ''}
          ${card.rarity === 'uncommon' ? 'bg-blue-900/50 text-blue-300' : ''}
          ${card.rarity === 'rare' ? 'bg-purple-900/50 text-purple-300' : ''}
        `}>
          {card.rarity}
        </span>
      </div>

      {/* Claim Button */}
      {!claimed ? (
        <button
          onClick={onClaim}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-purple-700 
                     hover:from-amber-500 hover:to-purple-600 rounded-lg font-bold
                     transition-all"
        >
          Claim Rewards
        </button>
      ) : (
        <div className="text-center text-green-400 font-semibold">
          ✓ Rewards Claimed
        </div>
      )}
    </div>
  );
}
