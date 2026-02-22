create or replace view public.v_fa_guidelines as
select
  b.slug as brand_slug,
  g.section,
  g.content
from public.identity_markers___brand_guidelines g
join public.identity_markers___brands b on b.id = g.brand_id;