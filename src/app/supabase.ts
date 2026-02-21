import { createClient } from '@supabase/supabase-js';
import { config, assertConfig } from "@/app/config";

assertConfig();
export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
