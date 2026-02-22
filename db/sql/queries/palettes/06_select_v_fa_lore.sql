select section, content
from public.v_fa_lore
where brand_slug = 'fallen-angels'
order by sort_order, section;