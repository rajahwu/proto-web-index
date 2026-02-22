select
  bi.semantic_name,
  a.id as asset_id,
  a.name as asset_name,
  a.asset_type,
  a.category,
  a.file_format,
  asl.storage_type,
  asl.path
from public.identity_markers___brand_icons bi
join public.assets a on a.id = bi.asset_id
join public.identity_markers___brands b on b.id = bi.brand_id
left join public.asset_storage_locations asl on asl.asset_id = a.id
where b.slug = 'fallen-angels'
order by bi.semantic_name;