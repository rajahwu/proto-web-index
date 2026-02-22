interface DoorCardProps {
  type: 'light' | 'dark' | 'secret';
  cost: number | string;
  canAfford: boolean;
  onClick: () => void;
  description: string;
}

export default function DoorCard({ type, cost, canAfford, onClick, description }: DoorCardProps) {
  const styles = {
    light: {
      gradient: 'from-amber-400 to-yellow-600',
      border: 'border-amber-400',
      glow: 'shadow-amber-400/50',
      text: 'text-amber-400',
    },
    dark: {
      gradient: 'from-purple-600 to-indigo-800',
      border: 'border-purple-400',
      glow: 'shadow-purple-400/50',
      text: 'text-purple-400',
    },
    secret: {
      gradient: 'from-slate-400 via-purple-500 to-amber-500',
      border: 'border-slate-300',
      glow: 'shadow-slate-300/50',
      text: 'text-slate-300',
    },
  };

  const style = styles[type];

  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`
        relative p-8 rounded-lg border-2 transition-all duration-300
        ${canAfford 
          ? `${style.border} bg-gradient-to-b ${style.gradient} bg-opacity-10 
             hover:scale-105 hover:shadow-2xl ${style.glow}` 
          : 'border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed'
        }
      `}
    >
      {/* Door Icon/Visual */}
      <div className={`
        w-full h-48 mb-4 rounded-lg flex items-center justify-center
        ${canAfford 
          ? `bg-gradient-to-b ${style.gradient}` 
          : 'bg-slate-700'
        }
      `}>
        <div className="text-6xl">
          {type === 'light' && '☀️'}
          {type === 'dark' && '🌙'}
          {type === 'secret' && '✨'}
        </div>
      </div>

      {/* Door Name */}
      <h3 className={`text-2xl font-bold mb-2 ${canAfford ? style.text : 'text-slate-500'}`}>
        {type === 'light' && 'Light Door'}
        {type === 'dark' && 'Dark Door'}
        {type === 'secret' && 'Secret Door'}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 mb-4 italic">
        {description}
      </p>

      {/* Cost */}
      <div className={`text-lg font-semibold ${canAfford ? style.text : 'text-slate-500'}`}>
        {typeof cost === 'number' 
          ? `Cost: ${cost} ${type === 'light' ? 'Light' : 'Dark'}`
          : `Cost: ${cost}`
        }
      </div>

      {/* Locked Indicator */}
      {!canAfford && (
        <div className="absolute top-4 right-4">
          <div className="text-2xl">🔒</div>
        </div>
      )}
    </button>
  );
}