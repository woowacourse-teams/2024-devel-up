import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useMissions from '../useMissions';
import type { Mission } from '@/types';
import missions from '@/mocks/missions.json';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useMissions', () => {
  it('전체 미션 목록을 가져올 수 있다.', async () => {
    const { result } = renderHook(() => useMissions(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Mission[]>(missions);
  });
});
