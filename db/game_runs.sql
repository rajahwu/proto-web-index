CREATE TABLE game_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  final_light INT,
  final_dark INT,
  levels_completed INT,
  choices JSONB -- log of every door taken, card drawn, etc.
);
