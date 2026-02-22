create or replace view public.v_fa_palette as
select
  b.slug as brand_slug,
  bc.semantic_name,
  c.token_name,
  c.hex,
  bc.usage_notes
from public.identity_markers___brand_colors bc
join public.colors c on c.id = bc.color_id
join public.identity_markers___brands b on b.id = bc.brand_id;