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

  it('필터링을 할 수 있다.', async () => {
    const filter = missions[0].hashTags[0].name;
    const filteredMissions = missions.filter((mission) => mission.hashTags[0].name === filter);
    const { result } = renderHook(() => useMissions(filter), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Mission[]>(filteredMissions);
  });
});
