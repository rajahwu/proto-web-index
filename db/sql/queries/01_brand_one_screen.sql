select
  b.id,
  b.name,
  b.slug,
  b.tagline,
  b.tone,
  b.keywords,
  b.created_at,
  b.updated_at
from public.identity_markers___brands b
where b.slug = 'fallen-angels';