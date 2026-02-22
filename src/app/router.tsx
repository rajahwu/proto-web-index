import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
// import IndexPage from '@features/index/IndexPage';
// import { indexLoader } from '@/features/index/index.loader';
import CharacterSelectPage from '../features/lite-game/character-select/CharacterSelectPage';

// Pass queryClient to loaders to enable pre-fetching
export const createAppRouter = (queryClient: QueryClient) => 
  createBrowserRouter([
    
 {
    path: '/',
    element: <div>Home (placeholder)</div>,
  },
  {
    path: '/lite-game/character-select',
    element: <CharacterSelectPage />,
  },
  {
    path: '/lite-game/level/:levelId',
    element: <div>Level View (placeholder)</div>,
  },


  //   {
  //     path: "/",
  //     element: <IndexPage />,
  //     loader: indexLoader(queryClient), // The RR7 Loader Pattern
  //   },

  //   {
  //   path: "/game-home",
  //   element: <GameHome />,
  //   loader: gameHomeLoader, // fetch player data
  // },
  // {
  //   path: "/character-select",
  //   element: <CharacterSelect />,
  //   loader: charactersLoader, // fetch available angels
  // },
  // {
  //   path: "/level/:levelId",
  //   element: <LevelView />,
  //   loader: levelLoader, // pre-fetch level data, doors, events
  //   children: [
  //     {
  //       path: "event/:eventId",
  //       element: <EventModal />,
  //       loader: eventLoader,
  //     },
  //     {
  //       path: "puzzle",
  //       element: <PuzzleView />,
  //     },
  //   ],
  // },
  // {
  //   path: "/door-choice",
  //   element: <DoorChoice />,
  //   loader: doorChoiceLoader, // check player's Light/Dark, available doors
  // },
  // {
  //   path: "/game-over",
  //   element: <GameOver />,
  // },
  ]);
