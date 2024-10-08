import { queryClient } from '@/index';
import useSingleRequestMutation from './useSingleRequestMutation';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { postDiscussionSubmit } from '@/apis/discussionAPI';

const SINGLE_REQUEST_ID = 'submit_discussion';

const useSubmitDiscussionMutation = () => {
  const navigate = useNavigate();

  const { mutate: submitDiscussionMutation, isPending } = useSingleRequestMutation({
    mutationFn: postDiscussionSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all'] }); // TODO: all, 필터링까지 캐시 무효화 잘 되는지 확인 필요 @프룬
      navigate(ROUTES.discussions);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
    requestId: SINGLE_REQUEST_ID,
  });

  return { submitDiscussionMutation, isPending };
};

export default useSubmitDiscussionMutation;
