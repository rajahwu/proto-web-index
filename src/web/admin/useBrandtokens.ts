import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/app/config/supabase';

export const useBrandTokens = () => {
  return useQuery({
    queryKey: ['brandTokens'],
    queryFn: async () => {
      // Fetch Colors
      const { data: colors, error: colorError } = await supabase
        .from('colors')
        .select('*')
        .order('token_name');
        
      if (colorError) throw colorError;

      // Fetch Typography
      const { data: typography, error: typoError } = await supabase
        .from('typography')
        .select('*')
        .order('token_name');
        
      if (typoError) throw typoError;

      return { colors, typography };
    },
  });
};