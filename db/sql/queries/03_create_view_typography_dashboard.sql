create or replace view public.v_fa_typography as
select
  b.slug as brand_slug,
  bt.semantic_name,
  t.token_name,
  t.device_category,
  t.font_family,
  t.font_weight,
  t.size_px,
  t.size_rem,
  t.line_height,
  t.letter_spacing,
  bt.usage_notes
from public.identity_markers___brand_typography bt
join public.typography t on t.id = bt.typography_id
join public.identity_markers___brands b on b.id = bt.brand_id;