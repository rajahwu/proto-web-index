// DoorChoice.tsx
import { useLoaderData } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import type { Level } from '@/web/lite-game/types/lite-game';
import DoorCard from '@/web/lite-game/pages/phases/door-choice/DoorCard';
import { useGameState } from '@/web/lite-game/hooks/useGameState';
import { attemptDoor } from '@/app/store/gameSlice';

const DoorChoice = () => {
  useGameState(); // Ensure game state is initialized
  const dispatch = useAppDispatch();
  const { currentLight, currentDark } = useAppSelector(state => state.gameEngine);
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
        onClick={() => dispatch(attemptDoor({ doorType: 'light', cost: level.light_door_cost }))}
      />
      <DoorCard
        type="dark"
        description=''
        cost={level.dark_door_cost}
        canAfford={canEnterDarkDoor}
        onClick={() => dispatch(attemptDoor({ doorType: 'dark', cost: level.dark_door_cost }))}
      />
      {canEnterSecretDoor && (
        <DoorCard
          type="secret"
          description=''
          cost={level.secret_door_requirements.dark + ' Dark, ' + level.secret_door_requirements.light + ' Light'}
          canAfford={true}
          onClick={() => dispatch(attemptDoor({ doorType: 'secret', cost: level.secret_door_requirements.dark + level.secret_door_requirements.light }))}
        />
      )}
    </div>
  );
};

export default DoorChoice;