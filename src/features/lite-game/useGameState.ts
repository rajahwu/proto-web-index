// useGameState.ts
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
