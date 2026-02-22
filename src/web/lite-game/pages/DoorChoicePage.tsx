import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { supabase, LITE_GAME_TABLES } from '@/app/config/supabase';
import { setLevel } from '@/app/store/gameSlice';
import type { Level } from '@/web/lite-game/types/lite-game';
import DoorCard from '@/web/lite-game/components/door-choice/DoorCard';

export default function DoorChoicePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const levelId = parseInt(searchParams.get('level') || '1');
  const { currentLight, currentDark } = useAppSelector(state => state.game);
  const playerId = localStorage.getItem('lite_game_player_id');

  const [level, setLevelData] = useState<Level | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Fetch level data
  useEffect(() => {
    if (!playerId) {
      navigate('/lite-game/character-select');
      return;
    } else if (isNaN(levelId) || levelId < 1) {
      navigate('/lite-game');
      return;
    }
    fetchLevel();
  }, [levelId, playerId, navigate]);
  
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => { }, 2000); // Show game over message for 2 seconds before navigating
      navigate('/lite-game/game-over');
    }
  }, [gameOver, navigate]);

  async function fetchLevel() {
    try {
      const { data, error: levelError } = await supabase
        .from(LITE_GAME_TABLES.LEVELS)
        .select('*')
        .eq('id', levelId)
        .single();

      if (levelError) throw levelError;
      setLevelData(data);
    } catch (err) {
      console.error('Failed to load level:', err);
      setError('Failed to load level data');
    } finally {
      setLoading(false);
    }
  }


  // Check door affordability
  const canAffordLightDoor = level ? currentLight >= level.light_door_cost : false;
  const canAffordDarkDoor = level ? currentDark >= level.dark_door_cost : false;
  const canAffordSecretDoor = level
    ? currentLight >= level.secret_door_requirements.light &&
    currentDark >= level.secret_door_requirements.dark
    : false;

  // Handle door selection
  const handleDoorChoice = async (doorType: 'light' | 'dark' | 'secret') => {
    if (!level || !playerId) return;

    try {
      const nextLevel = levelId + 1;

      // Log the door choice event
      await supabase.from(LITE_GAME_TABLES.EVENTS).insert({
        player_id: playerId,
        level_id: levelId,
        event_type: 'door_chosen',
        event_data: {
          door_type: doorType,
          light_spent: doorType === 'light' ? level.light_door_cost : 0,
          dark_spent: doorType === 'dark' ? level.dark_door_cost : 0,
        },
      });

      // Update player progress
      const { error: progressError } = await supabase
        .from(LITE_GAME_TABLES.PLAYER_PROGRESS)
        .update({
          current_level: nextLevel,
          last_updated: new Date().toISOString(),
        })
        .eq('player_id', playerId);

      if (progressError) throw progressError;

      // Update level completion tracking
      const { error: completionError } = await supabase
        .from(LITE_GAME_TABLES.PLAYER_LEVEL_PROGRESS)
        .upsert({
          player_id: playerId,
          level_id: levelId,
          completed: true,
          times_completed: 1, // Could increment if tracking reruns
          last_completed_at: new Date().toISOString(),
        });

      if (completionError) throw completionError;

      // Update Redux
      dispatch(setLevel(nextLevel));

      // Navigate to next level or game over
      if (nextLevel > 3) {
        setGameOver(true);
        return;
      } else {
        navigate(`/lite-game/level/${nextLevel}`);
      }

    } catch (err) {
      console.error('Failed to choose door:', err);
      setError('Failed to proceed through door');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading doors...</div>
      </div>
    );
  }

  if (error || !level) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || 'Level not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-600 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-slate-400">
            Each door leads forward, but only some are open to you
          </p>

          {/* Current Resources */}
          <div className="flex justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span className="font-bold text-amber-400">{currentLight}</span>
              <span className="text-slate-400 text-sm">Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="font-bold text-purple-400">{currentDark}</span>
              <span className="text-slate-400 text-sm">Dark</span>
            </div>
          </div>
        </div>

        {/* Doors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Light Door */}
          <DoorCard
            type="light"
            cost={level.light_door_cost}
            canAfford={canAffordLightDoor}
            onClick={() => handleDoorChoice('light')}
            description="A portal of radiant luminescence"
          />

          {/* Dark Door */}
          <DoorCard
            type="dark"
            cost={level.dark_door_cost}
            canAfford={canAffordDarkDoor}
            onClick={() => handleDoorChoice('dark')}
            description="A gateway shrouded in twilight"
          />

          {/* Secret Door (conditional) */}
          {canAffordSecretDoor && (
            <DoorCard
              type="secret"
              cost={`${level.secret_door_requirements.light}L + ${level.secret_door_requirements.dark}D`}
              canAfford={true}
              onClick={() => handleDoorChoice('secret')}
              description="A hidden path for those in balance"
            />
          )}
        </div>

        {/* Hint if no doors available */}
        {!canAffordLightDoor && !canAffordDarkDoor && !canAffordSecretDoor && (
          <div className="text-center p-6 bg-red-900/30 border border-red-500/50 rounded-lg">
            <p className="text-red-300">
              You don't have enough Light or Dark to open any doors. This shouldn't happen!
            </p>
          </div>
        )}


        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
