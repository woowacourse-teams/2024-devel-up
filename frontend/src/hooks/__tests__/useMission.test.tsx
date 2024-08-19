import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useMission from '../useMission';
import type { Mission } from '@/types';
import missions from '@/mocks/missions.json';
import { getMissionById } from '@/apis/missionAPI';

jest.mock('@/apis/missionApi');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useMission에 대한 테스트 코드 작성', () => {
  it('id값을 통해 단일 미션을 가져올 수 있다.', async () => {
    const mockGetMissionById = getMissionById as jest.Mock;

    const mission = missions[0];
    const missionId = mission.id;

    mockGetMissionById.mockReturnValueOnce(mission);

    const { result } = renderHook(() => useMission(missionId), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Mission>(mission);
  });
});
