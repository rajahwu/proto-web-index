with palette as (
  select
    c.token_name,
    c.hex
  from public.identity_markers___brand_colors bc
  join public.colors c on c.id = bc.color_id
  join public.identity_markers___brands b on b.id = bc.brand_id
  where b.slug = 'fallen-angels'
)
select
  'light' as theme,
  (select hex from palette where token_name = 'fa.light.bg.from') as bg_from,
  (select hex from palette where token_name = 'fa.light.bg.to') as bg_to
union all
select
  'dark' as theme,
  (select hex from palette where token_name = 'fa.dark.bg.from') as bg_from,
  (select hex from palette where token_name = 'fa.dark.bg.to') as bg_to;