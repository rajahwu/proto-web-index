select
  id,
  name,
  description,
  light_door_cost,
  dark_door_cost,
  secret_door_requirements
from public.lite_game___levels
order by id;