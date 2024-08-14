import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { PATH } from '@/apis/paths';
import missions from './missions.json';
import submittedSolutions from './SubmittedSolutions.json';

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
  // http.post(`${BASE_URL.dev}${PATH.submitSolution}`, () => {
  //   return HttpResponse.json({ data: submission });
  // }),

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
  http.get(`${BASE_URL.dev}${PATH.missionInProgress}`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          title: '루터회관 흡연 단속',
          language: 'JAVA',
          summary: '루터회관 흡연 벌칙 프로그램을 구현한다.',
          thumbnail:
            'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/38a7f41b-80d7-48ca-97c9-99ceda5c4dbd/smoking.png?id=60756a7a-c50f-4946-ab6e-4177598b926b&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721174400000&signature=todzUdb5cUyzW4ZQNaHvL-uiCngfMJJAl94RpE1TGEA&downloadName=smoking.png',
          hashtag: ['java', 'backend', '문제', 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ'],
        },
        {
          id: 2,
          title: '프론트엔드 숫자 야구 문제',
          language: 'React',
          summary: '프론트엔드 숫자 야구 문젤르 구현합니다',
          thumbnail:
            'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/38a7f41b-80d7-48ca-97c9-99ceda5c4dbd/smoking.png?id=60756a7a-c50f-4946-ab6e-4177598b926b&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721174400000&signature=todzUdb5cUyzW4ZQNaHvL-uiCngfMJJAl94RpE1TGEA&downloadName=smoking.png',
          hashtag: ['react', 'javascript', 'frontend', 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ'],
        },
      ],
    });
  }),
  http.get(`${BASE_URL.dev}${PATH.submitSolution}`, () => {
    return HttpResponse.json({
      data: submittedSolutions,
    });
  }),
  // http.post(`${BASE_URL.dev}${PATH.logout}`, () => {
  //   return HttpResponse.json(null, {
  //     headers: {
  //       'Set-Cookie': 'token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
  //     },
  //   });
  // }),
];
