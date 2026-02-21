CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('event', 'loot', 'encounter', 'puzzle')),
  light_reward INT DEFAULT 0,
  dark_reward INT DEFAULT 0,
  effect JSONB
);
