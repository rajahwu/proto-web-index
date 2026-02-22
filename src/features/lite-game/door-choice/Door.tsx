// DoorChoice.tsx
import { useLoaderData } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import type { Level } from '../../../types/lite-game';
import DoorCard from './DoorCard';
import { selectDoor } from '../gameSlice';

const DoorChoice = () => {
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
        cost={level.light_door_cost}
        canEnter={canEnterLightDoor}
        onClick={() => dispatch(selectDoor('light'))}
      />
      <DoorCard
        type="dark"
        cost={level.dark_door_cost}
        canEnter={canEnterDarkDoor}
        onClick={() => dispatch(selectDoor('dark'))}
      />
      {canEnterSecretDoor && (
        <DoorCard
          type="secret"
          cost={level.secret_door_requirements}
          canEnter={true}
          onClick={() => dispatch(selectDoor('secret'))}
        />
      )}
    </div>
  );
};

export default DoorChoice;