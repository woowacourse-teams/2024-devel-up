import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import useSingleRequest from './useSingleRequest';
import { ERROR_MESSAGE } from '@/constants/messages';

interface SingleFlightMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  requestId?: string;
  queryFn: (variables: TVariables) => Promise<TData>;
}

const useSingleRequestMutation = <TData, TError, TVariables = void>(
  options: SingleFlightMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> => {
  const { startRequest, endRequest } = useSingleRequest();
  const requestId = options?.requestId || 'defaultRequestId';

  return useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn: options.queryFn,
    onMutate: async (variables: TVariables) => {
      const canProceed = startRequest(requestId);
      if (!canProceed) {
        throw new Error(ERROR_MESSAGE.duplicate_request);
      }
      if (options?.onMutate) {
        return await options.onMutate(variables);
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      endRequest(requestId);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context as unknown);
      }
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      endRequest(requestId);
      if (options?.onError) {
        options.onError(error, variables, context as unknown);
      }
    },
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: unknown,
    ) => {
      endRequest(requestId);
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context as unknown);
      }
    },
  });
};

export default useSingleRequestMutation;
