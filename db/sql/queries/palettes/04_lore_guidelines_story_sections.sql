select
  g.section,
  g.content
from public.identity_markers___brand_guidelines g
join public.identity_markers___brands b on b.id = g.brand_id
where b.slug = 'fallen-angels'
order by
  case g.section
    when 'Core Identity' then 1
    when 'World Overview' then 2
    when 'Levels Lore' then 3
    when 'Characters Lore' then 4
    when 'Asset Shopping List' then 5
    when 'Deliverables' then 6
    else 99
  end,
  g.section;