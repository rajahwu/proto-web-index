CREATE TABLE levels (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  light_door_cost INT,
  dark_door_cost INT,
  secret_door_requirements JSONB, -- e.g., {"light": 3, "dark": 3}
  puzzle_data JSONB,
  events JSONB
);
