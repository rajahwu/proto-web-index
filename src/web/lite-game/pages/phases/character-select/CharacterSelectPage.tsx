import { useState } from 'react';
import { useNavigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { supabase, LITE_GAME_TABLES } from '@/app/config/supabase';
import { CHARACTERS, type CharacterOption } from '@/web/lite-game/types/characters';

export default function CharacterSelectPage({ queryClient }: { queryClient: QueryClient }) {
  queryClient;

  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<CharacterOption['class'] | null>(null);
  const [characterName, setCharacterName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCharacter = async () => {
    if (!selectedClass || !characterName.trim()) {
      setError('Please select a path and enter a name');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const { data: player, error: playerError } = await supabase
        .from(LITE_GAME_TABLES.PLAYERS)
        .insert({
          username: `player_${Date.now()}`,
          character_class: selectedClass,
          character_name: characterName.trim(),
        })
        .select()
        .single();

      if (playerError) throw playerError;

      const { error: statsError } = await supabase
        .from(LITE_GAME_TABLES.PLAYER_STATS)
        .insert({ player_id: player.id });
      if (statsError) throw statsError;

      const { error: progressError } = await supabase
        .from(LITE_GAME_TABLES.PLAYER_PROGRESS)
        .insert({
          player_id: player.id,
          current_level: 1,
          current_light: 0,
          current_dark: 0,
        });
      if (progressError) throw progressError;

      localStorage.setItem('lite_game_player_id', player.id);
      navigate('/lite-game/level/1');
    } catch (err) {
      console.error('Character creation failed:', err);
      setError('Failed to awaken character. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Dynamic styling helper based on theme
  const getThemeStyles = (charClass: string, isSelected: boolean) => {
    if (!isSelected) return 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/50 opacity-70 hover:opacity-100';

    switch (charClass) {
      case 'seraph': return 'border-amber-500 bg-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.15)] opacity-100 scale-[1.02]';
      case 'shadow': return 'border-purple-500 bg-slate-900 shadow-[0_0_30px_rgba(168,85,247,0.15)] opacity-100 scale-[1.02]';
      case 'exile': return 'border-slate-400 bg-slate-900 shadow-[0_0_30px_rgba(148,163,184,0.15)] opacity-100 scale-[1.02]';
      default: return '';
    }
  };

  const getAccentColor = (charClass: string) => {
    switch (charClass) {
      case 'seraph': return 'text-amber-400';
      case 'shadow': return 'text-purple-400';
      case 'exile': return 'text-slate-300';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
            Choose Your Nature
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            The fall was not an end. It was a beginning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CHARACTERS.map((char) => {
            const isSelected = selectedClass === char.class;
            return (
              <button
                key={char.class}
                onClick={() => setSelectedClass(char.class)}
                className={`
                  text-left p-8 rounded-xl border transition-all duration-300 ease-out
                  ${getThemeStyles(char.class, isSelected)}
                `}
              >
                <h2 className={`text-3xl font-bold mb-2 font-serif ${getAccentColor(char.class)}`}>
                  {char.displayName}
                </h2>
                <div className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-6 pb-4 border-b border-slate-800">
                  {char.description}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic opacity-90">
                  "{char.backstory}"
                </p>
                <div className={`font-mono text-sm font-medium ${getAccentColor(char.class)}`}>
                  ✦ {char.startingBonus}
                </div>
              </button>
            );
          })}
        </div>

        {/* Input & Action Area */}
        <div className={`max-w-md mx-auto transition-all duration-500 ${selectedClass ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <div className="space-y-6">
            <div>
              <label className="block font-mono text-sm text-slate-400 mb-3 uppercase tracking-widest text-center">
                Name your Angel
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter a name..."
                maxLength={30}
                className="w-full px-6 py-4 rounded-lg bg-slate-900/80 border border-slate-700 text-center text-xl text-white placeholder-slate-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all font-serif"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isCreating) handleCreateCharacter();
                }}
              />
            </div>

            {error && (
              <div className="text-center text-red-400 font-mono text-sm bg-red-950/30 py-3 rounded border border-red-900/50">
                {error}
              </div>
            )}

            <button
              onClick={handleCreateCharacter}
              disabled={isCreating || !characterName.trim()}
              className="w-full py-5 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 rounded-lg font-mono text-lg tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white shadow-lg"
            >
              {isCreating ? 'Awakening...' : 'Enter the Threshold'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}