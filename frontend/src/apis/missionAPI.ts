import { BASE_URL } from './baseUrl';
import { PATH } from './paths';
import type { Mission } from '@/types';

export const getAllMissions = async (): Promise<Mission[]> => {
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionList}`);

    if (!response.ok) {
      throw new Error('에러가 발생했어요! ');
    }

    const jsonData = await response.json();

    const { data } = jsonData;

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('');
  }
};

export const getMissionById = async (id: number): Promise<Mission> => {
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionList}/${id}`);

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
