import React from 'react';
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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

//TODO 각자 맡은 페이지로 구현해서 채워놓아야합니다 @버건디
const routes = [
  {
    path: ROUTES.main,
    element: (
      <App>
        <MissionListPage />
      </App>
    ),
  },
  {
    path: ROUTES.submit,
    element: (
      <App>
        <MissionSubmitPage />
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
    path: ROUTES.myMission,
    element: (
      <App>
        <MyMissionPage />
      </App>
    ),
  },
];

const router = createBrowserRouter(routes, {
  basename: ROUTES.main,
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
