CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  current_light INT DEFAULT 0,
  current_dark INT DEFAULT 0,
  current_level INT DEFAULT 1,
  unlocked_skills JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
