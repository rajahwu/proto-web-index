import { createClient } from "@supabase/supabase-js";
import { config, assertConfig } from "./config";

assertConfig();
export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const LITE_GAME_TABLES = {
  PLAYERS: "lite_game___players",
  PLAYER_STATS: "lite_game___player_stats",
  PLAYER_PROGRESS: "lite_game___player_progress",
  LEVELS: "lite_game___levels",
  CARDS: "lite_game___cards",
  SKILLS: "lite_game___skills",
  PLAYER_SKILLS: "lite_game___player_skills",
  EVENTS: "lite_game___events",
  PLAYER_LEVEL_PROGRESS: "lite_game___player_level_progress",
} as const;

export const LITE_GAME_FUNCTIONS = {
  UPDATE_PLAYER_PROGRESS: "update_player_progress",
} as const;

export const LITE_GAME_PROCEDURES = {
  UPDATE_PLAYER_PROGRESS: "update_player_progress",
} as const;

export const LITE_GAME_VIEWS = {
  PLAYER_PROGRESS: "lite_game___player_progress_view",
} as const;

