-- ============================================
-- FALLEN ANGELS / PROTO-INDEX LITE GAME SEED
-- ============================================

-- 0) BRAND
INSERT INTO public.identity_markers___brands (
  id, core_link_id, name, slug, tagline, tone, keywords, created_at, updated_at
) VALUES (
  'brand_fallen_angels_lite',
  NULL,
  'Fallen Angels',
  'fallen-angels',
  'Navigate the realms between light and shadow',
  'Mystical, ethereal, balanced (duality as harmony; not good vs evil).',
  '["threshold","dual-resource","light","dark","twilight","fallen-angels","roguelike","cards","choice-driven"]'::jsonb,
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 1) COLORS (tokens)
-- ============================================

-- Light Theme
INSERT INTO public.colors (id, token_name, hex, created_at, updated_at) VALUES
('clr_fa_light_primary',   'fa.light.primary',   '#F59E0B', now(), now()),
('clr_fa_light_secondary', 'fa.light.secondary', '#FBBF24', now(), now()),
('clr_fa_light_accent',    'fa.light.accent',    '#FEF3C7', now(), now()),
('clr_fa_light_text',      'fa.light.text',      '#1E293B', now(), now()),
('clr_fa_light_bg_from',   'fa.light.bg.from',   '#F8FAFC', now(), now()),
('clr_fa_light_bg_to',     'fa.light.bg.to',     '#E2E8F0', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Dark Theme
INSERT INTO public.colors (id, token_name, hex, created_at, updated_at) VALUES
('clr_fa_dark_primary',   'fa.dark.primary',   '#A855F7', now(), now()),
('clr_fa_dark_secondary', 'fa.dark.secondary', '#C084FC', now(), now()),
('clr_fa_dark_accent',    'fa.dark.accent',    '#1E1B4B', now(), now()),
('clr_fa_dark_text',      'fa.dark.text',      '#F1F5F9', now(), now()),
('clr_fa_dark_bg_from',   'fa.dark.bg.from',   '#0F172A', now(), now()),
('clr_fa_dark_bg_to',     'fa.dark.bg.to',     '#1E293B', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Hybrid/Secret
INSERT INTO public.colors (id, token_name, hex, created_at, updated_at) VALUES
('clr_fa_hybrid_accent', 'fa.hybrid.accent', '#64748B', now(), now())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2) BRAND <-> COLORS (semantic mapping)
-- ============================================

INSERT INTO public.identity_markers___brand_colors
(id, brand_id, color_id, semantic_name, usage_notes) VALUES
-- Light
('bclr_fa_01','brand_fallen_angels_lite','clr_fa_light_primary','Light / Primary','Amber 500 — radiant, warm, celestial'),
('bclr_fa_02','brand_fallen_angels_lite','clr_fa_light_secondary','Light / Secondary','Amber 400 — softer glow'),
('bclr_fa_03','brand_fallen_angels_lite','clr_fa_light_accent','Light / Accent','Amber 50 — ethereal highlights'),
('bclr_fa_04','brand_fallen_angels_lite','clr_fa_light_text','Light / Text','Slate 900 — grounded, readable'),
('bclr_fa_05','brand_fallen_angels_lite','clr_fa_light_bg_from','Light / Background From','Slate 50 — gradient start'),
('bclr_fa_06','brand_fallen_angels_lite','clr_fa_light_bg_to','Light / Background To','Slate 200 — gradient end'),

-- Dark
('bclr_fa_07','brand_fallen_angels_lite','clr_fa_dark_primary','Dark / Primary','Purple 500 — mysterious twilight'),
('bclr_fa_08','brand_fallen_angels_lite','clr_fa_dark_secondary','Dark / Secondary','Purple 400 — softer shadow'),
('bclr_fa_09','brand_fallen_angels_lite','clr_fa_dark_accent','Dark / Accent','Indigo 950 — cosmic depth'),
('bclr_fa_10','brand_fallen_angels_lite','clr_fa_dark_text','Dark / Text','Slate 100 — luminous'),
('bclr_fa_11','brand_fallen_angels_lite','clr_fa_dark_bg_from','Dark / Background From','Slate 900 — gradient start'),
('bclr_fa_12','brand_fallen_angels_lite','clr_fa_dark_bg_to','Dark / Background To','Slate 800 — gradient end'),

-- Hybrid
('bclr_fa_13','brand_fallen_angels_lite','clr_fa_hybrid_accent','Hybrid / Accent','Slate 500 — neutral balance')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3) TYPOGRAPHY TOKENS
-- ============================================

-- We store “token_name” as your canonical reference.
-- device_category can be: 'web' for now.

INSERT INTO public.typography (
  id, token_name, device_category, font_family, font_weight, size_px, size_rem, line_height, letter_spacing, created_at, updated_at
) VALUES
('typo_fa_heading','fa.font.heading','web','Cinzel','600','48','3','1.1','-0.02em',now(),now()),
('typo_fa_body','fa.font.body','web','Inter','400','16','1','1.5','0em',now(),now()),
('typo_fa_mono','fa.font.mono','web','JetBrains Mono','500','14','0.875','1.4','0em',now(),now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.identity_markers___brand_typography
(id, brand_id, typography_id, semantic_name, usage_notes) VALUES
('btypo_fa_01','brand_fallen_angels_lite','typo_fa_heading','Heading','Serif, divine, classical (fallback Georgia, serif)'),
('btypo_fa_02','brand_fallen_angels_lite','typo_fa_body','Body','Clean, modern, readable (fallback system-ui, sans-serif)'),
('btypo_fa_03','brand_fallen_angels_lite','typo_fa_mono','Mono','Numbers/stats/door costs (fallback Courier New)')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4) ICONS AS ASSETS (placeholders; URIs can be updated later)
-- ============================================

INSERT INTO public.assets (id, name, asset_type, category, file_format, created_at, updated_at) VALUES
('asset_fa_icon_light','Light Magic Icon','icon','ui','svg',now(),now()),
('asset_fa_icon_dark','Dark Magic Icon','icon','ui','svg',now(),now()),
('asset_fa_icon_hybrid','Hybrid Magic Icon','icon','ui','svg',now(),now()),
('asset_fa_badge_common','Card Rarity Badge: Common','icon','ui','svg',now(),now()),
('asset_fa_badge_uncommon','Card Rarity Badge: Uncommon','icon','ui','svg',now(),now()),
('asset_fa_badge_rare','Card Rarity Badge: Rare','icon','ui','svg',now(),now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.identity_markers___brand_icons (id, brand_id, asset_id, semantic_name, usage_notes) VALUES
('bicon_fa_01','brand_fallen_angels_lite','asset_fa_icon_light','Light Magic','Replace ☀️ / 🌟 / ✨'),
('bicon_fa_02','brand_fallen_angels_lite','asset_fa_icon_dark','Dark Magic','Replace 🌙 / 🌑 / 🔮'),
('bicon_fa_03','brand_fallen_angels_lite','asset_fa_icon_hybrid','Hybrid/Secret','Replace ✨ / 🌌 / ⚖️'),
('bicon_fa_04','brand_fallen_angels_lite','asset_fa_badge_common','Rarity: Common','Badge icon'),
('bicon_fa_05','brand_fallen_angels_lite','asset_fa_badge_uncommon','Rarity: Uncommon','Badge icon'),
('bicon_fa_06','brand_fallen_angels_lite','asset_fa_badge_rare','Rarity: Rare','Badge icon')
ON CONFLICT (id) DO NOTHING;

-- OPTIONAL storage placeholders (edit path later)
INSERT INTO public.asset_storage_locations (id, asset_id, storage_type, path) VALUES
('asl_fa_01','asset_fa_icon_light','supabase_storage','TBD/icons/light.svg'),
('asl_fa_02','asset_fa_icon_dark','supabase_storage','TBD/icons/dark.svg'),
('asl_fa_03','asset_fa_icon_hybrid','supabase_storage','TBD/icons/hybrid.svg'),
('asl_fa_04','asset_fa_badge_common','supabase_storage','TBD/icons/rarity-common.svg'),
('asl_fa_05','asset_fa_badge_uncommon','supabase_storage','TBD/icons/rarity-uncommon.svg'),
('asl_fa_06','asset_fa_badge_rare','supabase_storage','TBD/icons/rarity-rare.svg')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5) BRAND GUIDELINES (includes lore + deliverables + shopping list)
-- ============================================

INSERT INTO public.identity_markers___brand_guidelines (id, brand_id, section, content) VALUES
('bg_fa_01','brand_fallen_angels_lite','Core Identity',
'Name: Fallen Angels
Tagline: "Navigate the realms between light and shadow"
Genre: Roguelike card game, choice-driven progression
Tone: Mystical, ethereal, balanced (duality as harmony; not good vs evil)'),

('bg_fa_02','brand_fallen_angels_lite','World Overview',
'The Threshold Realms — a liminal space between mortal and celestial planes.
The Fall was not punishment, but choice. Only by understanding duality can angels ascend (or descend) with purpose.'),

('bg_fa_03','brand_fallen_angels_lite','Levels Lore',
'Level 1: The Threshold — Awareness. "You awaken. The fall was not an end. It was a beginning."
Level 2: The Crossroads — Commitment. "Every road leads somewhere. Not all destinations are visible from the start."
Level 3: The Sanctum — Integration. "What you carry defines what you become."'),

('bg_fa_04','brand_fallen_angels_lite','Characters Lore',
'The Seraph — compassion; redemption on their terms; +1 Light at level start.
The Shadow — curiosity; transformation; +1 Dark at level start.
The Exile — neutrality; understanding; chooses +1 Light or +1 Dark each level.'),

('bg_fa_05','brand_fallen_angels_lite','Asset Shopping List',
'Week 2 (Priority):
1) Level backgrounds (Threshold, Crossroads, Sanctum) — 1920x1080 webp/jpg
2) Door illustrations (Light, Dark, Secret) — square png/svg
3) Character portraits (Seraph, Shadow, Exile) — 512x512 png w/ transparency
Next:
4) Card background textures (Light/Dark/Hybrid)
5) UI Icons (Light/Dark/Hybrid + rarity badges)
Optional Week 3:
SFX pack + ambient BGM'),

('bg_fa_06','brand_fallen_angels_lite','Deliverables',
'1) Brand Style Guide (1–2 pages)
2) Lore Pack v1 (characters 200–300w each; levels 1–2 paragraphs each; card flavor text)
3) Asset Manifest + Missing List (queryable from DB)
4) Code cleanup targets: resource display component, gradient button, loading spinner, strict TS, tests')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6) LITE GAME CONTENT SEED
-- ============================================

-- Levels (match your lore + door costs)
INSERT INTO public.lite_game___levels (
  id, name, description, light_door_cost, dark_door_cost, secret_door_requirements
) VALUES
(1,'The Threshold','A mist-shrouded plaza suspended between sky and void. Awareness begins in twilight.',0,0,'{"light":2,"dark":2}'::jsonb),
(2,'The Crossroads','A labyrinth of luminous paths and shadowed alleys. Choices echo.',3,2,'{"light":5,"dark":3}'::jsonb),
(3,'The Sanctum','A circular temple beneath a dome of stars. Integration decides your fate.',6,5,'{"light":8,"dark":8}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Cards (12ish is ideal; starting with 8 core)
INSERT INTO public.lite_game___cards (
  name, description, light_reward, dark_reward, card_type, rarity
) VALUES
('Divine Vision','A glimpse of celestial clarity. The memory hurts, but it illuminates.',3,0,'event','common'),
('Radiant Echo','Grace returns in fragments. You feel the path align.',2,0,'event','common'),
('Guiding Ember','A warm sign in the fog. You step with certainty.',1,0,'event','common'),

('Shadow Bargain','Power at a price. Some truths are heavier than lies.',0,3,'event','common'),
('Veil Whisper','The dark speaks softly. You listen and change.',0,2,'event','common'),
('Abyssal Thread','A thin line into the unknown. You pull anyway.',0,1,'event','common'),

('Twilight Choice','Two paths appear: dawn and dusk. Walking both is wisdom.',2,2,'event','uncommon'),
('Cosmic Equilibrium','Light and dark orbit like twin stars. You stand centered.',3,3,'event','rare')
ON CONFLICT (name) DO NOTHING;

-- Skills (optional but seeded for Week 2)
INSERT INTO public.lite_game___skills (
  name, description, light_cost, dark_cost, skill_type, effect_data
) VALUES
('Radiant Insight','Before drawing, reveal multiple card options and choose one.',5,0,'light','{"effect":"reveal_cards","count":3}'::jsonb),
('Veil of Shadows','Once per level, reroll a bad outcome (dice or event roll).',0,5,'dark','{"effect":"reroll","uses_per_level":1}'::jsonb),
('Twilight Synthesis','Once per level, convert 1 Light ↔ 1 Dark.',3,3,'hybrid','{"effect":"convert","amount":1,"uses_per_level":1}'::jsonb)
ON CONFLICT (name) DO NOTHING;