-- SEED LEVELS (3 for MVP)
INSERT INTO lite_game___levels (id, name, description, light_door_cost, dark_door_cost, secret_door_requirements) VALUES
  (1, 'The Threshold', 'Where fallen angels first awaken', 0, 0, '{"light": 2, "dark": 2}'),
  (2, 'The Crossroads', 'A junction of luminous paths and shadowed alleys', 3, 2, '{"light": 5, "dark": 3}'),
  (3, 'The Sanctum', 'Final chamber where light and dark converge', 6, 5, '{"light": 8, "dark": 8}');

-- SEED CARDS (12 total: 4 Light, 4 Dark, 4 Hybrid)
INSERT INTO lite_game___cards (name, description, light_reward, dark_reward, card_type, rarity) VALUES
  -- LIGHT CARDS
  ('Divine Vision', 'A glimpse of celestial clarity', 3, 0, 'event', 'common'),
  ('Radiant Blessing', 'Grace flows through you', 2, 0, 'event', 'common'),
  ('Angelic Whisper', 'A voice from the heavens guides you', 4, 0, 'event', 'uncommon'),
  ('Sunburst', 'Pure luminous energy erupts', 5, 0, 'event', 'rare'),
  
  -- DARK CARDS
  ('Shadow Bargain', 'Power at a price', 0, 3, 'event', 'common'),
  ('Veil of Night', 'Darkness conceals your path', 0, 2, 'event', 'common'),
  ('Whispers of the Abyss', 'Secrets from the depths', 0, 4, 'event', 'uncommon'),
  ('Eclipse', 'Total darkness envelops everything', 0, 5, 'event', 'rare'),
  
  -- HYBRID CARDS
  ('Twilight Choice', 'Choose illumination or shadow', 2, 2, 'hybrid', 'common'),
  ('Dusk and Dawn', 'Balance between extremes', 3, 1, 'hybrid', 'uncommon'),
  ('The Gray Path', 'Neither light nor dark, but both', 1, 3, 'hybrid', 'uncommon'),
  ('Cosmic Equilibrium', 'Perfect harmony achieved', 3, 3, 'hybrid', 'rare');

-- SEED SKILLS (8 total: 3 Light, 3 Dark, 2 Hybrid)
INSERT INTO lite_game___skills (name, description, light_cost, dark_cost, skill_type, effect_data) VALUES
  -- LIGHT SKILLS
  ('Radiant Insight', 'Reveal 3 cards before choosing', 5, 0, 'light', '{"type": "card_preview", "count": 3}'),
  ('Blessing of Clarity', 'Guarantee next card is Light-type', 4, 0, 'light', '{"type": "filter_cards", "card_type": "light"}'),
  ('Luminous Shield', 'Protect 2 Light points from door costs', 6, 0, 'light', '{"type": "cost_reduction", "resource": "light", "amount": 2}'),
  
  -- DARK SKILLS
  ('Veil of Shadows', 'Reroll dice once per level', 0, 5, 'dark', '{"type": "reroll", "target": "dice"}'),
  ('Dark Bargain', 'Convert 2 Light to 3 Dark', 0, 4, 'dark', '{"type": "conversion", "from": "light", "to": "dark", "ratio": 1.5}'),
  ('Abyssal Knowledge', 'Guarantee next card is Dark-type', 0, 6, 'dark', '{"type": "filter_cards", "card_type": "dark"}'),
  
  -- HYBRID SKILLS
  ('Twilight Synthesis', 'Convert 1 Light to 1 Dark (or reverse)', 3, 3, 'hybrid', '{"type": "swap", "amount": 1}'),
  ('Cosmic Balance', 'When Light = Dark, gain +1 to both', 5, 5, 'hybrid', '{"type": "passive_bonus", "condition": "balanced"});