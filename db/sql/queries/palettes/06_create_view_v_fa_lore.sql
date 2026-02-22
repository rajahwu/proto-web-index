create or replace view public.v_fa_lore as
select
  b.slug as brand_slug,
  g.section,
  g.content,
  case g.section
    when 'Core Identity' then 1
    when 'World Overview' then 2
    when 'Levels Lore' then 3
    when 'Characters Lore' then 4
    when 'Asset Shopping List' then 5
    when 'Deliverables' then 6
    else 99
  end as sort_order
from public.identity_markers___brand_guidelines g
join public.identity_markers___brands b on b.id = g.brand_id;