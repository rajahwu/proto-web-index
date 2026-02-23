import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/app/hooks';
import { supabase, LITE_GAME_TABLES } from '@/app/config/supabase';
import { resetGame } from '@/app/store/gameSlice';

export default function GameOverPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const playerId = localStorage.getItem('lite_game_player_id');

  const [stats, setStats] = useState<{ light: number; dark: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) {
      navigate('/lite-game');
      return;
    }

    async function fetchFinalStats() {
      try {
        // Get final resources
        const { data: progress } = await supabase
          .from(LITE_GAME_TABLES.PLAYER_PROGRESS)
          .select('current_light, current_dark')
          .eq('player_id', playerId)
          .single();

        // Get player name
        const { data: player } = await supabase
          .from(LITE_GAME_TABLES.PLAYERS)
          .select('character_name')
          .eq('id', playerId)
          .single();

        if (progress && player) {
          setStats({
            light: progress.current_light,
            dark: progress.current_dark,
            name: player.character_name,
          });
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFinalStats();
  }, [playerId, navigate]);

  const handlePlayAgain = () => {
    // Clear local storage and redux state
    localStorage.removeItem('lite_game_player_id');
    dispatch(resetGame());
    navigate('/lite-game');
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono">Calculating fate...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center justify-center relative overflow-hidden">

      {/* Sanctum Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
            Ascension Complete
          </h1>
          <p className="text-xl text-slate-400 italic font-sans">
            You have traversed the Threshold, {stats?.name}.
          </p>
        </div>

        {/* Final Stats Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-8 border-b border-slate-800 pb-4">
            Final Resonance
          </h2>

          <div className="flex justify-center gap-16">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-amber-400 font-serif">{stats?.light || 0}</div>
              <div className="text-sm text-slate-400 font-mono uppercase">Light Magic</div>
            </div>

            <div className="w-px bg-slate-800"></div>

            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-purple-400 font-serif">{stats?.dark || 0}</div>
              <div className="text-sm text-slate-400 font-mono uppercase">Dark Magic</div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={handlePlayAgain}
            className="px-10 py-4 bg-slate-800 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-700 rounded-lg font-mono tracking-widest uppercase transition-all text-white shadow-lg"
          >
            Return to the Void
          </button>
        </div>

      </div>
    </div>
  );
}