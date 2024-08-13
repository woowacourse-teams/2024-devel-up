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
  http.post(`${BASE_URL.dev}${PATH.submitSolution}`, () => {
    return HttpResponse.json({ data: submission });
  }),

  http.get(`${BASE_URL.dev}${PATH.userInfo}`, () => {
    return HttpResponse.json(
      {
        data: {
          id: 1,
          email: 'abcd@abcd.com',
          name: '아무개',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
          description: '안녕하세요! 화이팅 해보아요! ',
        },
      },
      {
        headers: {
          'Set-Cookie': 'token=1234',
        },
      },
    );
  }),
  // http.post(`${BASE_URL.dev}${PATH.logout}`, () => {
  //   return HttpResponse.json(null, {
  //     headers: {
  //       'Set-Cookie': 'token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
  //     },
  //   });
  // }),
];
