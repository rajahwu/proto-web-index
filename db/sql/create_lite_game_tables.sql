-- CORE PLAYER DATA
CREATE TABLE lite_game___players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  character_class TEXT NOT NULL, -- 'seraph', 'shadow', 'exile'
  character_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PERSISTENT STATS (lifetime totals)
CREATE TABLE lite_game___player_stats (
  player_id UUID PRIMARY KEY REFERENCES lite_game___players(id) ON DELETE CASCADE,
  total_light_earned INT DEFAULT 0,
  total_dark_earned INT DEFAULT 0,
  games_played INT DEFAULT 0,
  games_won INT DEFAULT 0,
  highest_level_reached INT DEFAULT 1,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- CURRENT RUN STATE (resets per game)
CREATE TABLE lite_game___player_progress (
  player_id UUID PRIMARY KEY REFERENCES lite_game___players(id) ON DELETE CASCADE,
  current_level INT DEFAULT 1,
  current_light INT DEFAULT 0,
  current_dark INT DEFAULT 0,
  run_started_at TIMESTAMPTZ DEFAULT NOW(),
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- LEVELS
CREATE TABLE lite_game___levels (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  light_door_cost INT NOT NULL,
  dark_door_cost INT NOT NULL,
  secret_door_requirements JSONB -- e.g., {"light": 3, "dark": 3}
);

-- CARDS (event cards that GIVE Light/Dark)
CREATE TABLE lite_game___cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  light_reward INT DEFAULT 0,
  dark_reward INT DEFAULT 0,
  card_type TEXT DEFAULT 'event', -- 'event', 'risk', 'hybrid'
  rarity TEXT DEFAULT 'common'
);

-- SKILLS (unlock with Light/Dark)
CREATE TABLE lite_game___skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  light_cost INT NOT NULL,
  dark_cost INT NOT NULL,
  skill_type TEXT NOT NULL, -- 'light', 'dark', 'hybrid'
  effect_data JSONB NOT NULL -- e.g., {"type": "reroll_dice", "uses": 1}
);

-- PLAYER UNLOCKED SKILLS
CREATE TABLE lite_game___player_skills (
  player_id UUID REFERENCES lite_game___players(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES lite_game___skills(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (player_id, skill_id)
);

-- EVENTS LOG (unified tracking)
CREATE TABLE lite_game___events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES lite_game___players(id) ON DELETE CASCADE,
  level_id INT REFERENCES lite_game___levels(id),
  event_type TEXT NOT NULL, -- 'card_drawn', 'door_chosen', 'skill_unlocked'
  event_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEVEL COMPLETION TRACKING
CREATE TABLE lite_game___player_level_progress (
  player_id UUID REFERENCES lite_game___players(id) ON DELETE CASCADE,
  level_id INT REFERENCES lite_game___levels(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  times_completed INT DEFAULT 0,
  best_time_seconds INT,
  last_completed_at TIMESTAMPTZ,
  PRIMARY KEY (player_id, level_id)
);