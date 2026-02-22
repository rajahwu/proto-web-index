select
  c.hex,
  count(*) as uses,
  string_agg(c.token_name, ', ' order by c.token_name) as tokens
from public.identity_markers___brand_colors bc
join public.colors c on c.id = bc.color_id
join public.identity_markers___brands b on b.id = bc.brand_id
where b.slug = 'fallen-angels'
group by c.hex
having count(*) > 1
order by uses desc, c.hex;