export interface Player {
  id: string;
  username: string;
  character_class: "seraph" | "shadow" | "exile";
  character_name: string;
  created_at: string;
}

export interface PlayerStats {
  player_id: string;
  total_light_earned: number;
  total_dark_earned: number;
  games_played: number;
  games_won: number;
  highest_level_reached: number;
  last_updated: string;
}

export interface PlayerProgress {
  player_id: string;
  current_level: number;
  current_light: number;
  current_dark: number;
  run_started_at: string;
  last_updated: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  light_door_cost: number;
  dark_door_cost: number;
  secret_door_requirements: {
    light: number;
    dark: number;
  };
}

export interface Card {
  id: string;
  name: string;
  description: string;
  light_reward: number;
  dark_reward: number;
  card_type: "event" | "risk" | "hybrid";
  rarity: "common" | "uncommon" | "rare";
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  light_cost: number;
  dark_cost: number;
  skill_type: "light" | "dark" | "hybrid";
  effect_data: Record<string, any>;
}

export interface GameEvent {
  id: string;
  player_id: string;
  level_id?: number;
  event_type:
    | "card_drawn"
    | "door_chosen"
    | "skill_unlocked"
    | "level_completed";
  event_data: Record<string, any>;
  created_at: string;
}
