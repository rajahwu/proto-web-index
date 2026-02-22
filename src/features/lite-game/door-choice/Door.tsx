// DoorChoice.tsx
import { useLoaderData } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import type { Level } from '@/types/lite-game';
import DoorCard from '@/features/lite-game/door-choice/DoorCard';
import { selectDoor } from '@/features/lite-game/gameSlice';

const DoorChoice = () => {
  const dispatch = useAppDispatch();
  const { currentLight, currentDark } = useAppSelector(state => state.game);
  const { data: level } = useLoaderData() as { data: Level };

  const canEnterLightDoor = currentLight >= level.light_door_cost;
  const canEnterDarkDoor = currentDark >= level.dark_door_cost;
  const canEnterSecretDoor = 
    currentLight >= level.secret_door_requirements.light &&
    currentDark >= level.secret_door_requirements.dark;

  return (
    <div className="door-choice-container">
      <DoorCard
        type="light"
        description=''
        cost={level.light_door_cost}
        canAfford={canEnterLightDoor}
        onClick={() => dispatch(selectDoor('light'))}
      />
      <DoorCard
        type="dark"
        description=''
        cost={level.dark_door_cost}
        canAfford={canEnterDarkDoor}
        onClick={() => dispatch(selectDoor('dark'))}
      />
      {canEnterSecretDoor && (
        <DoorCard
          type="secret"
          description=''
          cost={level.secret_door_requirements.dark + ' Dark, ' + level.secret_door_requirements.light + ' Light'}
          canAfford={true}
          onClick={() => dispatch(selectDoor('secret'))}
        />
      )}
    </div>
  );
};

export default DoorChoice;