import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { PATH } from '@/apis/paths';
import missions from './missions.json';
import submission from './submission.json';

export const handlers = [
  http.get(`${BASE_URL.dev}${PATH.missionList}`, () => {
    return HttpResponse.json({ data: missions });
  }),
  http.get(`${BASE_URL.dev}${PATH.missionList}/:id`, ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.pathname.split('/').pop());
    const mission = missions.find((mission) => mission.id === id);
    return HttpResponse.json({ data: mission });
  }),
  http.post(`${BASE_URL.dev}${PATH.submissions}`, () => {
    return HttpResponse.json({ data: submission });
  }),
];
