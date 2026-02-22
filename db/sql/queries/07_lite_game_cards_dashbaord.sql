select
  rarity,
  card_type,
  name,
  light_reward,
  dark_reward,
  description
from public.lite_game___cards
order by
  case rarity when 'common' then 1 when 'uncommon' then 2 when 'rare' then 3 else 9 end,
  name;