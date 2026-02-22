import { useNavigate } from 'react-router';

export default function LiteGameHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Ambient background glow (The Twilight Blend) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-amber-500/10 to-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full text-center space-y-12 relative z-10">

        {/* Title Section */}
        <div className="space-y-6">
          <h1
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-purple-500 drop-shadow-sm"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Fallen Angels
          </h1>
          <p
            className="text-xl md:text-2xl text-slate-300 italic font-light tracking-wide"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Navigate the realms between light and shadow.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={() => navigate('/lite-game/character-select')}
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-amber-500/50 hover:border-amber-400 hover:bg-slate-800 rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] text-amber-50 font-medium text-lg tracking-wide cursor-pointer"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Begin Ascension
          </button>

          <button
            disabled
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-600 cursor-not-allowed font-medium text-lg tracking-wide"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Continue Path
          </button>
        </div>

        {/* Decorative Divider */}
        <div className="pt-16 flex justify-center gap-6 text-slate-700">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>

      </div>
    </div>
  );
}