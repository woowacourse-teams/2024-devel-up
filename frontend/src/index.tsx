import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { ROUTES } from './constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/common/Error/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import QueryErrorBoundary from './components/common/Error/QueryErrorBoundary';
import * as Sentry from '@sentry/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import './styles/fonts.css';
import DiscussionListPage from './pages/DiscussionListPage';

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

const MissionDetailPage = lazy(() => import('./pages/MissionDetailPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const MissionSubmitPage = lazy(() => import('./pages/MissionSubmitPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
// const GuidePage = lazy(() => import('./pages/GuidePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const DiscussionDetailPage = lazy(() => import('./pages/DiscussionDetailPage'));
const DiscussionSubmitPage = lazy(() => import('./pages/DiscussionSubmitPage'));
const SolutionListPage = lazy(() => import('./pages/SolutionListPage'));
const MissionListPage = lazy(() => import('./pages/MissionListPage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DashBoardMissionInProgressPage = lazy(
  () => import('./pages/DashboardPage/MissionInProgress'),
);
const MyCommentsPage = lazy(() => import('./pages/DashboardPage/MyComments'));
const SubmittedSolutionList = lazy(() => import('./components/DashBoard/SubmittedSolutions'));

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
        <Suspense fallback={<LoadingSpinner />}>
          <UserProfilePage />
        </Suspense>
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
            <MyCommentsPage />
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
  {
    path: ROUTES.about,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <AboutPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: `${ROUTES.discussions}/:id`,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <DiscussionDetailPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: `${ROUTES.discussions}`,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <DiscussionListPage />
        </Suspense>
      </App>
    ),
  },
  {
    path: ROUTES.submitDiscussion,
    element: (
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <DiscussionSubmitPage />
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
//             <ThemeProvider theme={theme}>
//               <GlobalStyle />
//               <RouterProvider router={router} />
//             </ThemeProvider>
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
