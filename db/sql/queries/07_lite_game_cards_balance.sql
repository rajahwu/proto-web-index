select
  count(*) as cards,
  sum(light_reward) as total_light,
  sum(dark_reward) as total_dark,
  avg(light_reward) as avg_light,
  avg(dark_reward) as avg_dark
from public.lite_game___cards;