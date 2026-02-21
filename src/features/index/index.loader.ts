import { QueryClient } from '@tanstack/react-query';

const indexQuery = () => ({
  queryKey: ['indexData'],
  queryFn: async () => {
    return { message: "Hello from Proto Web Index" };
    // Real Supabase call:
    // const { data, error } = await supabase.from('items').select('*');
    // if (error) throw error;
    // return data;
  },
});

export const indexLoader = (queryClient: QueryClient) => async () => {
  // Ensure data is cached
  return queryClient.ensureQueryData(indexQuery());
};
