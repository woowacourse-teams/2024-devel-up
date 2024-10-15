import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { ROUTES } from './constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy } from 'react';
import QueryErrorBoundary from './components/common/Error/QueryErrorBoundary';
import * as Sentry from '@sentry/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import './styles/fonts.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SpinnerSuspense from './components/common/SpinnerSuspense';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      gcTime: 20000,
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

// 메인
const MainPage = lazy(() => import('./pages/MainPage'));
// const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
// const GuidePage = lazy(() => import('./pages/GuidePage'));

// 미션
const MissionDetailPage = lazy(() => import('./pages/MissionDetailPage'));
const MissionSubmitPage = lazy(() => import('./pages/MissionSubmitPage'));
const MissionListPage = lazy(() => import('./pages/MissionListPage'));

// 풀이 (솔루션)
const SolutionListPage = lazy(() => import('./pages/SolutionListPage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));

// 디스커션
const DiscussionDetailPage = lazy(() => import('./pages/DiscussionDetailPage'));
const DiscussionSubmitPage = lazy(() => import('./pages/DiscussionSubmitPage'));
const DiscussionListPage = lazy(() => import('./pages/DiscussionListPage'));

// 대시보드
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DashboardDiscussionPage = lazy(() => import('./pages/DashboardPage/Discussion'));
const DashboardDiscussionCommentPage = lazy(
  () => import('./pages/DashboardPage/DiscussionComment'),
);
const DashBoardMissionInProgressPage = lazy(
  () => import('./pages/DashboardPage/MissionInProgress'),
);
const MyCommentsPage = lazy(() => import('./pages/DashboardPage/MyComments'));
const SubmittedSolutionList = lazy(() => import('./components/DashBoard/SubmittedSolutions'));

// 기타
const ErrorFallback = lazy(() => import('@/components/common/Error/ErrorFallback'));
const NeedToLoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const PrivateRoute = lazy(() => import('./components/common/PrivateRoute'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const routes = [
  {
    path: ROUTES.main,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <MainPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: `${ROUTES.submitSolution}/:id`,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            {/* <PrivateRoute redirectTo={ROUTES.login}> */}
            <MissionSubmitPage />
            {/* </PrivateRoute> */}
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: `${ROUTES.missionDetail}/:id`,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <MissionDetailPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: ROUTES.profile,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <PrivateRoute redirectTo={ROUTES.login}>
              <UserProfilePage />
            </PrivateRoute>
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  // {
  //   path: ROUTES.guide,
  //   element: (
  //     <App>
  //       <Suspense fallback={<LoadingSpinner />}>
  //         <GuidePage />
  //       </Suspense>
  //     </App>
  //   ),
  // },
  {
    path: ROUTES.missionList,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <MissionListPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: ROUTES.solutions,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <SolutionListPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: ROUTES.dashboardHome,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <DashboardPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
    children: [
      {
        path: ROUTES.dashboardMissionInProgress,
        element: (
          <SpinnerSuspense>
            <DashBoardMissionInProgressPage />
          </SpinnerSuspense>
        ),
      },
      {
        path: ROUTES.dashboardSubmittedSolution,
        element: (
          <SpinnerSuspense>
            <SubmittedSolutionList />
          </SpinnerSuspense>
        ),
      },
      {
        path: ROUTES.dashboardComments,
        element: (
          <SpinnerSuspense>
            <MyCommentsPage />
          </SpinnerSuspense>
        ),
      },
      {
        path: ROUTES.dashboardDiscussions,
        element: (
          <SpinnerSuspense>
            <DashboardDiscussionPage />
          </SpinnerSuspense>
        ),
      },
      {
        path: ROUTES.dashboardDiscussionComments,
        element: (
          <SpinnerSuspense>
            <DashboardDiscussionCommentPage />
          </SpinnerSuspense>
        ),
      },
    ],
  },
  {
    path: `${ROUTES.solutions}/:id`,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <SolutionDetailPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: `${ROUTES.discussions}/:id`,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <DiscussionDetailPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: ROUTES.submitDiscussion,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <PrivateRoute redirectTo={ROUTES.login}>
              <DiscussionSubmitPage />
            </PrivateRoute>
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: ROUTES.discussions,
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <DiscussionListPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: '/login',
    element: (
      <QueryErrorBoundary>
        <App>
          <SpinnerSuspense>
            <NeedToLoginPage />
          </SpinnerSuspense>
        </App>
      </QueryErrorBoundary>
    ),
  },
  {
    path: '*',
    element: <ErrorFallback statusCode={404} />,
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
//         <ThemeProvider theme={theme}>
//           <ReactQueryDevtools initialIsOpen={false} />
//           <GlobalStyle />
//           <RouterProvider router={router} />
//         </ThemeProvider>
//       </QueryClientProvider>
//     </React.StrictMode>,
//   );
// });

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
