select
  case
    when c.token_name like 'fa.light.%' then 'light'
    when c.token_name like 'fa.dark.%' then 'dark'
    when c.token_name like 'fa.hybrid.%' then 'hybrid'
    else 'global'
  end as theme,
  bc.semantic_name,
  c.token_name,
  c.hex,
  bc.usage_notes
from public.identity_markers___brand_colors bc
join public.colors c on c.id = bc.color_id
join public.identity_markers___brands b on b.id = bc.brand_id
where b.slug = 'fallen-angels'
order by
  theme,
  c.token_name;