import { useNavigate } from 'react-router';

export default function LiteGameHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-2xl text-center space-y-8">
        
        {/* Title using the hybrid twilight gradient */}
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500 font-serif" style={{ fontFamily: 'Cinzel, serif' }}>
          Fallen Angels
        </h1>
        
        <p className="text-xl text-slate-300 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
          "Navigate the realms between light and shadow"
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/lite-game/character-select')}
            className="px-8 py-3 bg-slate-800 border border-amber-500/50 hover:border-amber-400 hover:bg-slate-800/80 rounded transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] text-amber-100"
          >
            New Game
          </button>
          {/* Future implementation: <button>Continue Game</button> */}
        </div>

      </div>
    </div>
  );
}