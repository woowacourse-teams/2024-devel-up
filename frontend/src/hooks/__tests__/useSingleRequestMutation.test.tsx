import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSingleRequestMutation from '../useSingleRequestMutation';
import type { PropsWithChildren } from 'react';

const createQueryClient = () => new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
);

const mockVariable = jest.fn();
const mockMutationFn = jest.fn().mockResolvedValue('success');
const mockOnMutate = jest.fn();
const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();
const mockOnSettled = jest.fn();

describe('useSingleRequestMutation 훅 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 상태가 정상적으로 설정된다.', () => {
    const { result } = renderHook(() => useSingleRequestMutation({ mutationFn: mockMutationFn }), {
      wrapper,
    });

    expect(result.current.mutate).toBeDefined();
  });

  it('요청이 성공적으로 수행되면 onSuccess와 onSettled가 호출된다.', async () => {
    const { result } = renderHook(
      () =>
        useSingleRequestMutation({
          mutationFn: mockMutationFn,
          onSuccess: mockOnSuccess,
          onSettled: mockOnSettled,
        }),
      { wrapper },
    );

    result.current.mutate(undefined);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledTimes(1);
      expect(mockOnSuccess).toHaveBeenCalledWith('success', undefined, undefined);
      expect(mockOnSettled).toHaveBeenCalledWith('success', null, undefined, undefined);
    });
  });

  it('요청이 실패하면 onError와 onSettled가 호출된다.', async () => {
    const error = new Error('error');
    mockMutationFn.mockRejectedValueOnce(error);
    const { result } = renderHook(
      () =>
        useSingleRequestMutation({
          mutationFn: mockMutationFn,
          onError: mockOnError,
          onSettled: mockOnSettled,
        }),
      { wrapper },
    );

    result.current.mutate(undefined);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledWith(error, undefined, undefined);
      expect(mockOnSettled).toHaveBeenCalledWith(undefined, error, undefined, undefined);
    });
  });

  it('동일한 requestId로 중복 요청이 방지된다.', async () => {
    const { result } = renderHook(
      () => useSingleRequestMutation({ mutationFn: mockMutationFn, requestId: 'testRequestId' }),
      { wrapper },
    );

    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);
    result.current.mutate(mockVariable);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledTimes(1);
    });
  });

  it('다른 requestId로 요청이 가능하다.', async () => {
    const { result: result1 } = renderHook(
      () => useSingleRequestMutation({ mutationFn: mockMutationFn, requestId: 'requestId1' }),
      { wrapper },
    );

    const { result: result2 } = renderHook(
      () => useSingleRequestMutation({ mutationFn: mockMutationFn, requestId: 'requestId2' }),
      { wrapper },
    );

    result1.current.mutate(mockVariable);
    result2.current.mutate(mockVariable);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledTimes(2);
    });
  });

  it('onMutate가 호출되면 요청 전에 실행된다.', async () => {
    const { result } = renderHook(
      () => useSingleRequestMutation({ mutationFn: mockMutationFn, onMutate: mockOnMutate }),
      { wrapper },
    );

    result.current.mutate(mockVariable);

    await waitFor(() => {
      expect(mockOnMutate).toHaveBeenCalled();
      expect(mockMutationFn).toHaveBeenCalledTimes(1);
    });
  });
});
