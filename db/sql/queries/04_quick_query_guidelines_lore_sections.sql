select
  g.section,
  g.content
from public.identity_markers___brand_guidelines g
join public.identity_markers___brands b on b.id = g.brand_id
where b.slug = 'fallen-angels'
order by g.section;