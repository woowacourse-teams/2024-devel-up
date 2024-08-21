import { useMutation } from '@tanstack/react-query';
import { deleteLogout } from '@/apis/authAPI';

const useLogoutMutation = () => {
  const { mutate: userLogoutMutation } = useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => {
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
