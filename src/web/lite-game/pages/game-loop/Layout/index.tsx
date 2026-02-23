import { useLoopGame } from '../useLoopGame';
import '../style.css';

import { Title, Select, Staging, Draft, Level, Door, Drop } from '../game-phases';
/**
 * Root layout for the Loop prototype.
 * Uses a local `useReducer`-based state machine (useLoopGame)
 * to drive the 7-screen game loop without page-level routing.
 */
export default function LoopLayout() {
  const game = useLoopGame();
  const { screen } = game.state;

  return (
    <>
      {screen === 'title' && <Title game={game} />}
      {screen === 'select' && <Select game={game} />}
      {screen === 'staging' && <Staging game={game} />}
      {screen === 'draft' && <Draft game={game} />}
      {screen === 'level' && <Level game={game} />}
      {screen === 'door' && <Door game={game} />}
      {screen === 'drop' && <Drop game={game} />}
    </>
  );
}
