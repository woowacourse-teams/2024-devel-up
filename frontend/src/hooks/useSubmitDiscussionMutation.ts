import { queryClient } from '@/index';
import useSingleRequestMutation from './useSingleRequestMutation';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { postDiscussionSubmit } from '@/apis/discussionAPI';
import { discussionKeys } from './queries/keys';

const SINGLE_REQUEST_ID = 'submit_discussion';

const useSubmitDiscussionMutation = () => {
  const navigate = useNavigate();

  const { mutate: submitDiscussionMutation, isPending } = useSingleRequestMutation({
    mutationFn: postDiscussionSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.all });
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
