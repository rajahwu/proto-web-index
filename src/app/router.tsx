import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import IndexPage from '../features/index/IndexPage';
import { indexLoader } from '../features/index/index.loader';

// Pass queryClient to loaders to enable pre-fetching
export const createAppRouter = (queryClient: QueryClient) => 
  createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />,
      loader: indexLoader(queryClient), // The RR7 Loader Pattern
    },
  ]);
