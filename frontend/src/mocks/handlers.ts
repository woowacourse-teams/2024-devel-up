import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { PATH } from '@/apis/paths';
import missions from './missions.json';

export const handlers = [
  http.get(`${BASE_URL.dev}${PATH.missionList}`, () => {
    return HttpResponse.json({ data: missions });
  }),
];
