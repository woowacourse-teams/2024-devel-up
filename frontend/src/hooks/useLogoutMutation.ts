import { useMutation } from '@tanstack/react-query';
import { deleteLogout } from '@/apis/authAPI';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const useLogoutMutation = () => {
  const navigate = useNavigate();

  const dashboardRoutes = [
    ROUTES.dashboardHome,
    ROUTES.dashboardMissionInProgress,
    ROUTES.dashboardSubmittedSolution,
    ROUTES.dashboardComments,
    ROUTES.dashboardDiscussions,
    ROUTES.dashboardDiscussionComments,
  ];

  const navigateToHome = () => {
    const currentPath = window.location.pathname;
    const isDashboardPage = dashboardRoutes.some((route) => currentPath.includes(route));

    if (isDashboardPage) {
      navigate(ROUTES.main);
    }
  };

  const { mutate: userLogoutMutation } = useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => {
      navigateToHome();
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const handleUserLogout = () => {
    userLogoutMutation();
  };

  return { handleUserLogout };
};

export default useLogoutMutation;
