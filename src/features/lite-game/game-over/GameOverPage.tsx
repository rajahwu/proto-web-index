import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/app/hooks';
import { resetGame } from '../gameSlice';
import { supabase, LITE_GAME_TABLES as TABLES } from '@/app/supabase';
import type { PlayerStats } from '@/types/lite-game';

export default function GameOverPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const playerId = localStorage.getItem('lite_game_player_id');

  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) {
      navigate('/lite-game/character-select');
      return;
    }

    async function fetchStats() {
      try {
        // Fetch player stats
        const { data: statsData, error: statsError } = await supabase
          .from(TABLES.PLAYER_STATS)
          .select('*')
          .eq('player_id', playerId)
          .single();

        if (statsError) throw statsError;

        // Increment games_played and games_won
        const { error: updateError } = await supabase
          .from(TABLES.PLAYER_STATS)
          .update({
            games_played: (statsData.games_played || 0) + 1,
            games_won: (statsData.games_won || 0) + 1,
            highest_level_reached: Math.max(statsData.highest_level_reached || 0, 3),
            last_updated: new Date().toISOString(),
          })
          .eq('player_id', playerId);

        if (updateError) throw updateError;

        // Fetch updated stats
        const { data: updatedStats, error: fetchError } = await supabase
          .from(TABLES.PLAYER_STATS)
          .select('*')
          .eq('player_id', playerId)
          .single();

        if (fetchError) throw fetchError;
        setStats(updatedStats);

        // Log game completion event
        await supabase.from(TABLES.EVENTS).insert({
          player_id: playerId,
          event_type: 'game_completed',
          event_data: {
            total_light_earned: updatedStats.total_light_earned,
            total_dark_earned: updatedStats.total_dark_earned,
          },
        });

      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [playerId, navigate]);

  const handlePlayAgain = async () => {
    if (!playerId) return;

    try {
      // Reset player progress for new run
      const { error: resetError } = await supabase
        .from(TABLES.PLAYER_PROGRESS)
        .update({
          current_level: 1,
          current_light: 0,
          current_dark: 0,
          run_started_at: new Date().toISOString(),
          last_updated: new Date().toISOString(),
        })
        .eq('player_id', playerId);

      if (resetError) throw resetError;

      // Reset Redux state
      dispatch(resetGame());

      // Navigate to Level 1
      navigate('/lite-game/level/1');

    } catch (err) {
      console.error('Failed to reset game:', err);
    }
  };

  const handleNewCharacter = () => {
    // Clear player ID and return to character select
    localStorage.removeItem('lite_game_player_id');
    dispatch(resetGame());
    navigate('/lite-game/character-select');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Victory Message */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-purple-600 bg-clip-text text-transparent">
            Journey Complete
          </h1>
          <p className="text-xl text-slate-300">
            You have navigated the realms of light and shadow
          </p>
        </div>

        {/* Stats Display */}
        {stats && (
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Your Legacy</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Total Light Earned */}
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm text-slate-400">Total Light Earned</span>
                </div>
                <div className="text-3xl font-bold text-amber-400">
                  {stats.total_light_earned}
                </div>
              </div>

              {/* Total Dark Earned */}
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-slate-400">Total Dark Earned</span>
                </div>
                <div className="text-3xl font-bold text-purple-400">
                  {stats.total_dark_earned}
                </div>
              </div>

              {/* Games Played */}
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">Games Played</div>
                <div className="text-3xl font-bold text-slate-300">
                  {stats.games_played}
                </div>
              </div>

              {/* Games Won */}
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">Games Won</div>
                <div className="text-3xl font-bold text-green-400">
                  {stats.games_won}
                </div>
              </div>

              {/* Highest Level */}
              <div className="col-span-2 text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">Highest Level Reached</div>
                <div className="text-3xl font-bold text-blue-400">
                  Level {stats.highest_level_reached}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handlePlayAgain}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-purple-600 
                       hover:from-amber-400 hover:to-purple-500 rounded-lg font-bold text-lg
                       transition-all"
          >
            Play Again
          </button>

          <button
            onClick={handleNewCharacter}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 
                       rounded-lg font-semibold transition-all"
          >
            Choose New Character
          </button>

          <button
            onClick={() => navigate('/lite-game')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 
                       border border-slate-600 rounded-lg font-semibold transition-all"
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
}