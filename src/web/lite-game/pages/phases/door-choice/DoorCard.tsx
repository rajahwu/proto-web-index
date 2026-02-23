interface DoorCardProps {
  type: 'light' | 'dark' | 'secret';
  cost: number | string;
  canAfford: boolean;
  onClick: () => void;
  description: string;
}

export default function DoorCard({ type, cost, canAfford, onClick, description }: DoorCardProps) {
  const getDoorStyles = () => {
    if (!canAfford) {
      return 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed grayscale';
    }

    switch (type) {
      case 'light':
        return 'border-amber-500 bg-slate-900 hover:bg-slate-800 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:-translate-y-1 cursor-pointer';
      case 'dark':
        return 'border-purple-500 bg-slate-900 hover:bg-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:-translate-y-1 cursor-pointer';
      case 'secret':
        return 'border-slate-400 bg-slate-900 hover:bg-slate-800 shadow-[0_0_30px_rgba(148,163,184,0.2)] hover:shadow-[0_0_40px_rgba(148,163,184,0.4)] hover:-translate-y-1 cursor-pointer relative overflow-hidden';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'light': return 'Path of Light';
      case 'dark': return 'Path of Shadow';
      case 'secret': return 'The Hidden Way';
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'light': return 'text-amber-400';
      case 'dark': return 'text-purple-400';
      case 'secret': return 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400';
    }
  };

  return (
    <button
      onClick={() => canAfford && onClick()}
      disabled={!canAfford}
      className={`
        w-full p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-between min-h-[300px]
        ${getDoorStyles()}
      `}
    >
      {/* Secret Door Gradient Overlay */}
      {type === 'secret' && canAfford && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-purple-600/5 pointer-events-none" />
      )}

      <div className="text-center space-y-4 relative z-10">
        <h3 className={`text-2xl font-bold font-serif ${getAccentColor()}`}>
          {getTitle()}
        </h3>

        {/* Placeholder for actual door art later */}
        <div className="w-24 h-32 mx-auto border border-dashed rounded opacity-30 flex items-center justify-center my-6">
          <span className="font-mono text-xs">Door Art</span>
        </div>

        <p className="text-sm text-slate-400 italic font-sans leading-relaxed">
          "{description}"
        </p>
      </div>

      <div className="mt-6 w-full relative z-10">
        <div className="bg-slate-950/50 rounded p-3 border border-slate-800/50">
          <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Cost to Enter</div>
          <div className={`font-mono font-bold ${getAccentColor()}`}>
            {cost}
          </div>
        </div>

        {!canAfford && (
          <div className="mt-3 text-xs text-red-400/80 font-mono uppercase tracking-widest">
            Insufficient Magic
          </div>
        )}
      </div>
    </button>
  );
}