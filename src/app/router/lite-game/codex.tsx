// Inside src/app/router/lite-game.tsx
import { type RouteObject } from 'react-router';
import CodexHomePage from '@/web/game-lore/pages/codex/HomePage';
import CodexIndexPage from '@/web/game-lore/pages/codex/IndexPage';
import CodexLorePage from '@/web/game-lore/pages/codex/LorePage';


export const liteGameCodexRoutes: RouteObject[] = [
    {
        path: 'codex',
        element: <CodexHomePage />,
    },
    {
        path: 'codex/index',
        element: <CodexIndexPage />,
    },
    {
        path: 'codex/lore', // <-- Add this route
        element: <CodexLorePage />,
    },
    // ... other existing routes (level, door-choice, game-over)
];