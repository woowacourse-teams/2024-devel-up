import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { ROUTES } from './constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MissionDetailPage from './pages/MissionDetailPage';
import MainPage from './pages/MainPage';
import MissionSubmitPage from './pages/MissionSubmitPage';
import UserProfilePage from './pages/UserProfilePage';
import GuidePage from './pages/GuidePage';
import React, { Suspense } from 'react';
import { ErrorBoundary } from './components/common/Error/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import QueryErrorBoundary from './components/common/Error/QueryErrorBoundary';
import * as Sentry from '@sentry/react';
import ErrorPage from './pages/ErrorPage';
import SolutionListPage from './pages/SolutionListPage';
import MissionListPage from './pages/MissionListPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import DashboardPage from './pages/DashboardPage';
import DashBoardMissionInProgressPage from './pages/DashboardPage/MissionInProgress';
import SubmittedSolutionList from './components/DashBoard/SubmittedSolutions';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^https:\/\/api\.devel-up\.co\.kr\/?$/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const routes = [
  {
    path: ROUTES.main,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <MainPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: `${ROUTES.submitSolution}/:id`,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <MissionSubmitPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: `${ROUTES.missionDetail}/:id`,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <MissionDetailPage />
        </Suspense>
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
    path: ROUTES.missionList,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <MissionListPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.error,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.solutions,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <SolutionListPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.dashboardHome,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardPage />
        </Suspense>
      </App>
    ),
    children: [
      {
        path: ROUTES.dashboardMissionInProgress,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashBoardMissionInProgressPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.dashboardSubmittedSolution,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SubmittedSolutionList />
          </Suspense>
        ),
      },
      {
        path: ROUTES.dashboardComments,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <div>comments</div>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: `${ROUTES.solutions}/:id`,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <SolutionDetailPage />
        </Suspense>
      </App>
    ),
  },
];

export const router = createBrowserRouter(routes, {
  basename: ROUTES.main,
});

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() => {
//   root.render(
//     <React.StrictMode>
//       <QueryClientProvider client={queryClient}>
//         <QueryErrorBoundary>
//           <ErrorBoundary fallback={<div>에러에요!</div>}>
//             <GlobalStyle />
//             <RouterProvider router={router} />
//           </ErrorBoundary>
//         </QueryErrorBoundary>
//       </QueryClientProvider>
//     </React.StrictMode>,
//   );
// });

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        <ErrorBoundary fallback={<div>에러에요!</div>}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </ThemeProvider>
        </ErrorBoundary>
      </QueryErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
