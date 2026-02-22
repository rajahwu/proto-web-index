import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase, LITE_GAME_TABLES as TABLES } from '../../../app/supabase';
import { CHARACTERS, type CharacterOption } from './characters';
import type { Player } from '../../../types/lite-game';

export default function CharacterSelectPage() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<CharacterOption['class'] | null>(null);
  const [characterName, setCharacterName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCharacter = async () => {
    if (!selectedClass || !characterName.trim()) {
      setError('Please select a class and enter a name');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Create player
      const { data: player, error: playerError } = await supabase
        .from(TABLES.PLAYERS)
        .insert({
          username: `player_${Date.now()}`, // Unique username
          character_class: selectedClass,
          character_name: characterName.trim(),
        })
        .select()
        .single();

      if (playerError) throw playerError;

      // Initialize player stats
      const { error: statsError } = await supabase
        .from(TABLES.PLAYER_STATS)
        .insert({
          player_id: player.id,
        });

      if (statsError) throw statsError;

      // Initialize player progress
      const { error: progressError } = await supabase
        .from(TABLES.PLAYER_PROGRESS)
        .insert({
          player_id: player.id,
          current_level: 1,
          current_light: 0,
          current_dark: 0,
        });

      if (progressError) throw progressError;

      // Store player ID in localStorage for session persistence
      localStorage.setItem('lite_game_player_id', player.id);

      // Navigate to level 1
      navigate('/lite-game/level/1');
    } catch (err) {
      console.error('Character creation failed:', err);
      setError('Failed to create character. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-purple-600 bg-clip-text text-transparent">
            Choose Your Fallen Angel
          </h1>
          <p className="text-slate-400 text-lg">
            Select a path between light and shadow
          </p>
        </div>

        {/* Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CHARACTERS.map((char) => (
            <button
              key={char.class}
              onClick={() => setSelectedClass(char.class)}
              className={`
                p-6 rounded-lg border-2 transition-all duration-200
                ${selectedClass === char.class
                  ? 'border-amber-400 bg-slate-700 scale-105'
                  : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                }
              `}
            >
              <h2 className="text-2xl font-bold mb-2">{char.displayName}</h2>
              <p className="text-sm text-slate-300 mb-4">{char.description}</p>
              <div className="text-xs text-amber-400 font-semibold">
                {char.startingBonus}
              </div>
            </button>
          ))}
        </div>

        {/* Name Input */}
        {selectedClass && (
          <div className="mb-8 animate-fade-in">
            <label className="block text-sm font-medium mb-2">
              Name your {CHARACTERS.find(c => c.class === selectedClass)?.displayName}:
            </label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name..."
              maxLength={30}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 
                         text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isCreating) {
                  handleCreateCharacter();
                }
              }}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Create Button */}
        {selectedClass && characterName.trim() && (
          <button
            onClick={handleCreateCharacter}
            disabled={isCreating}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-purple-600 
                       hover:from-amber-400 hover:to-purple-500 rounded-lg font-bold text-lg
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? 'Creating...' : 'Begin Your Journey'}
          </button>
        )}
      </div>
    </div>
  );
}
