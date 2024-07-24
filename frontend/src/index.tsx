import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { ROUTES } from './constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MissionDetailPage from './pages/MissionDetailPage';
import MissionListPage from './pages/MissionListPage';
import MissionSubmitPage from './pages/MissionSubmitPage';
import MyMissionPage from './pages/MyMissionPage';
import UserProfilePage from './pages/UserProfilePage';
import GuidePage from './pages/GuidePage';
import React, { Suspense } from 'react';
import QueryErrorBoundary from './components/common/Error/QueryErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const routes = [
  {
    path: ROUTES.main,
    element: (
      <App>
        <Suspense fallback={<div>로딩중입니다!</div>}>
          <MissionListPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.submit,
    element: (
      <App>
        <Suspense fallback={<div>로딩중입니다!</div>}>
          <MissionSubmitPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.missionDetail,
    element: (
      <App>
        <MissionDetailPage />
      </App>
    ),
  },
  {
    path: ROUTES.profile,
    element: (
      <App>
        <UserProfilePage />
      </App>
    ),
  },
  {
    path: ROUTES.guide,
    element: (
      <App>
        <GuidePage />
      </App>
    ),
  },
  {
    path: ROUTES.myMission,
    element: (
      <App>
        <MyMissionPage />
      </App>
    ),
  },
];

export const router = createBrowserRouter(routes, {
  basename: ROUTES.main,
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
