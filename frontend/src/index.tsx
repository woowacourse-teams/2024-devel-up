import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { ROUTES } from './constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import QueryErrorBoundary from './components/common/Error/QueryErrorBoundary';
import * as Sentry from '@sentry/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import './styles/fonts.css';

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

// 메인
const MainPage = lazy(() => import('./pages/MainPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
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
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/404Page'));
const NeedToLoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const PrivateRoute = lazy(() => import('./components/common/PrivateRoute'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const routes = [
  {
    path: ROUTES.main,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MainPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: `${ROUTES.submitSolution}/:id`,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute redirectTo={ROUTES.login}>
              <MissionSubmitPage />
            </PrivateRoute>
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: `${ROUTES.missionDetail}/:id`,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MissionDetailPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: ROUTES.profile,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute redirectTo={ROUTES.login}>
              <UserProfilePage />
            </PrivateRoute>
          </Suspense>
        </QueryErrorBoundary>
      </App>
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
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MissionListPage />
          </Suspense>
        </QueryErrorBoundary>
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
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <SolutionListPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: ROUTES.dashboardHome,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardPage />
          </Suspense>
        </QueryErrorBoundary>
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
            <MyCommentsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.dashboardDiscussions,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardDiscussionPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.dashboardDiscussionComments,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardDiscussionCommentPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: `${ROUTES.solutions}/:id`,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <SolutionDetailPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: ROUTES.about,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: `${ROUTES.discussions}/:id`,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <DiscussionDetailPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: ROUTES.submitDiscussion,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute redirectTo={ROUTES.login}>
              <DiscussionSubmitPage />
            </PrivateRoute>
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: ROUTES.discussions,
    element: (
      <App>
        <QueryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <DiscussionListPage />
          </Suspense>
        </QueryErrorBoundary>
      </App>
    ),
  },
  {
    path: '/login',
    element: (
      <App>
        <NeedToLoginPage />
      </App>
    ),
  },
  {
    path: '*',
    element: (
      <App>
        <NotFoundPage />
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
//         <ThemeProvider theme={theme}>
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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
