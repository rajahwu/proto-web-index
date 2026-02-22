// useGameState.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/app/supabase";

export const useGameState = (playerId: string) => {
  return useQuery({
    queryKey: ['gameState', playerId],
    queryFn: async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();
      return data;
    },
  });
};
