create or replace view public.v_fa_game_bible as
select
  'brand' as section,
  b.slug as key,
  jsonb_build_object(
    'name', b.name,
    'tagline', b.tagline,
    'tone', b.tone,
    'keywords', b.keywords
  ) as payload
from public.identity_markers___brands b
where b.slug = 'fallen-angels'

union all

select
  'palette' as section,
  bc.semantic_name as key,
  jsonb_build_object(
    'token_name', c.token_name,
    'hex', c.hex,
    'notes', bc.usage_notes
  ) as payload
from public.identity_markers___brand_colors bc
join public.colors c on c.id = bc.color_id
join public.identity_markers___brands b on b.id = bc.brand_id
where b.slug = 'fallen-angels'

union all

select
  'typography' as section,
  bt.semantic_name as key,
  jsonb_build_object(
    'token_name', t.token_name,
    'font_family', t.font_family,
    'weight', t.font_weight,
    'size_px', t.size_px,
    'line_height', t.line_height
  ) as payload
from public.identity_markers___brand_typography bt
join public.typography t on t.id = bt.typography_id
join public.identity_markers___brands b on b.id = bt.brand_id
where b.slug = 'fallen-angels'

union all

select
  'levels' as section,
  l.name as key,
  jsonb_build_object(
    'id', l.id,
    'light_cost', l.light_door_cost,
    'dark_cost', l.dark_door_cost,
    'secret', l.secret_door_requirements
  ) as payload
from public.lite_game___levels l;