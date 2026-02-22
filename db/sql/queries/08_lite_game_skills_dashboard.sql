select
  skill_type,
  name,
  light_cost,
  dark_cost,
  description,
  effect_data
from public.lite_game___skills
order by skill_type, name;