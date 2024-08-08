import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSubmissionMutation from '../useSubmissionMutation';
import type { SubmissionPayload } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useSubmissionMutation에 관한 테스트 코드를 작성한다.', () => {
  it('유효한 형식으로 미션 제출을 했다면 데이터를 서버에 성공적으로 전송한다.', async () => {
    const onSuccessCallback = jest.fn();
    const { result } = renderHook(() => useSubmissionMutation({ onSuccessCallback }), { wrapper });

    const payload: SubmissionPayload = {
      missionId: 1,
      title: '자바 숫자 야구',
      url: 'https://github.com/woowacourse-teams/2024-devel-up/pull/150',
      description: '만나서 반갑습니다.',
    };

    act(() => {
      result.current.submissionMutation(payload);
    });

    await waitFor(() => expect(onSuccessCallback).toHaveBeenCalled());
    expect(result.current.isPending).toBe(false);
  });
});
