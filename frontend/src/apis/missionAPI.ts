import { BASE_URL } from './baseUrl';
import { PATH } from './paths';
import type { Mission, MissionInProgress } from '@/types';

// TODO msw 테스트를 위해 일단 순수 fetch 함수로 구현합니다.
export const getAllMissions = async (): Promise<Mission[]> => {
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionList}`);

    if (!response.ok) {
      throw new Error('Failed to fetch missions');
    }

    const jsonData = await response.json();

    const { data } = jsonData;

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('');
  }
};

export const getMissionInProgress = async (): Promise<MissionInProgress> => {
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionInProgress}`);

    if (!response.ok) {
      throw new Error('에러가 발생했어요!');
    }

    const jsonData = await response.json();

    const { data } = jsonData;

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('');
  }
};
