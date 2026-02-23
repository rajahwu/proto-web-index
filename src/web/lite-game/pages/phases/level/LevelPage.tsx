import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { supabase, LITE_GAME_TABLES } from '@/app/config/supabase';
import type { Level, Card } from '@/web/lite-game/types/lite-game';
import LevelHeader from '@/web/lite-game/pages/phases/level/LevelHeader';
import CardDisplay from '@/web/lite-game/pages/phases/level/CardDisplay';

export default function LevelPage({ queryClient }: { queryClient: QueryClient }) {
  queryClient; // Currently not used, but can be passed to loaders for pre-fetching in the future
  
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentLight, currentDark } = useAppSelector(state => state.gameEngine);
  const playerId = localStorage.getItem('lite_game_player_id');

  const [level, setLevel] = useState<Level | null>(null);
  const [drawnCard, setDrawnCard] = useState<Card | null>(null);
  const [cardClaimed, setCardClaimed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch level data on mount
  useEffect(() => {
    if (!playerId) {
      navigate('/lite-game/character-select');
      return;
    }

    async function fetchLevel() {
      try {
        const { data, error: levelError } = await supabase
          .from(LITE_GAME_TABLES.LEVELS)
          .select('*')
          .eq('id', parseInt(levelId || '1'))
          .single();

        if (levelError) throw levelError;
        setLevel(data);

        // Also fetch current player progress to sync Light/Dark
        const { data: progress, error: progressError } = await supabase
          .from(LITE_GAME_TABLES.PLAYER_PROGRESS)
          .select('*')
          .eq('player_id', playerId)
          .single();

        if (progressError) throw progressError;

        // Sync Redux with DB state
        dispatch({
          type: 'gameEngine/syncProgress', payload: {
            currentLight: progress.current_light,
            currentDark: progress.current_dark,
          }
        });

      } catch (err) {
        console.error('Failed to load level:', err);
        setError('Failed to load level');
      } finally {
        setLoading(false);
      }
    }

    fetchLevel();
  }, [levelId, playerId, navigate, dispatch]);

  // Draw a random card
  const handleDrawCard = async () => {
    try {
      // Fetch all cards
      const { data: cards, error: cardsError } = await supabase
        .from(LITE_GAME_TABLES.CARDS)
        .select('*');

      if (cardsError) throw cardsError;
      if (!cards || cards.length === 0) throw new Error('No cards available');

      // Pick random card
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      setDrawnCard(randomCard);

      // Log event
      await supabase.from(LITE_GAME_TABLES.EVENTS).insert({
        player_id: playerId,
        level_id: level?.id,
        event_type: 'card_drawn',
        event_data: { card_id: randomCard.id, card_name: randomCard.name },
      });

    } catch (err) {
      console.error('Failed to draw card:', err);
      setError('Failed to draw card');
    }
  };

  // Claim card rewards
  const handleClaimCard = async () => {
    if (!drawnCard || !playerId) return;

    try {
      // Update Redux state
      dispatch({ type: 'gameEngine/addLight', payload: drawnCard.light_reward });
      dispatch({ type: 'gameEngine/addDark', payload: drawnCard.dark_reward });

      // Update DB
      const newLight = currentLight + drawnCard.light_reward;
      const newDark = currentDark + drawnCard.dark_reward;

      const { error: updateError } = await supabase
        .from(LITE_GAME_TABLES.PLAYER_PROGRESS)
        .update({
          current_light: newLight,
          current_dark: newDark,
          last_updated: new Date().toISOString(),
        })
        .eq('player_id', playerId);

      if (updateError) throw updateError;

      // Log event
      await supabase.from(LITE_GAME_TABLES.EVENTS).insert({
        player_id: playerId,
        level_id: level?.id,
        event_type: 'card_claimed',
        event_data: {
          card_id: drawnCard.id,
          light_gained: drawnCard.light_reward,
          dark_gained: drawnCard.dark_reward,
        },
      });

      setCardClaimed(true);

    } catch (err) {
      console.error('Failed to claim card:', err);
      setError('Failed to claim card');
    }
  };

  // Proceed to door selection
  const handleProceedToDoors = () => {
    navigate(`/lite-game/door-choice?level=${levelId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading level...</div>
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with Light/Dark totals */}
        <LevelHeader
          levelName={level.name}
          levelDescription={level.description}
          currentLight={currentLight}
          currentDark={currentDark}
          lightDoorCost={level.light_door_cost}
          darkDoorCost={level.dark_door_cost}
          secretDoorRequirements={level.secret_door_requirements}
        />

        {/* Card Drawing Area */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {!drawnCard ? (
            <div className="text-center">
              <p className="text-slate-400 mb-6">
                Draw a card to collect Light or Dark magic
              </p>
              <button
                onClick={handleDrawCard}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-purple-600 
                           hover:from-amber-400 hover:to-purple-500 rounded-lg font-bold text-lg
                           transition-all"
              >
                Draw Card
              </button>
            </div>
          ) : (
            <CardDisplay
              card={drawnCard}
              onClaim={handleClaimCard}
              claimed={cardClaimed}
            />
          )}
        </div>

        {/* Proceed to Doors Button */}
        {cardClaimed && (
          <button
            onClick={handleProceedToDoors}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 
                       hover:from-green-500 hover:to-blue-500 rounded-lg font-bold text-lg
                       transition-all animate-fade-in"
          >
            Proceed to Doors →
          </button>
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
