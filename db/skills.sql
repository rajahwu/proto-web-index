CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('light', 'dark', 'hybrid')),
  unlock_cost JSONB, -- e.g., {"light": 5, "dark": 0}
  effect TEXT
);

