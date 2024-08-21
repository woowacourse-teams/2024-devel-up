import { http, HttpResponse } from 'msw';
import { PATH } from '@/apis/paths';
import missions from './missions.json';
import submittedSolutions from './SubmittedSolutions.json';
import myComments from './myComments.json';
import missionInProgress from './missionInProgress.json';
import { HASHTAGS } from '@/constants/hashTags';
import { API_URL } from '@/apis/clients/develupClient';

export const handlers = [
  http.get(`${API_URL}${PATH.missionList}`, ({ request }) => {
    const url = new URL(request.url);
    const hashTag = url.searchParams.get('hashTag');
    if (hashTag === HASHTAGS.all) {
      return HttpResponse.json({ data: missions });
    }

    const filteredMissions = missions.filter((mission) => mission.hashTags[0].name === hashTag);

    return HttpResponse.json({ data: filteredMissions });
  }),

  http.get(`${API_URL}${PATH.missionList}/:id`, ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.pathname.split('/').pop());
    const mission = missions.find((mission) => mission.id === id);
    return HttpResponse.json({ data: mission });
  }),
  // http.post(`${BASE_URL.dev}${PATH.submitSolution}`, () => {
  //   return HttpResponse.json({ data: submission });
  // }),

  http.get(`${API_URL}${PATH.userInfo}`, () => {
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
  http.get(`${API_URL}${PATH.missionInProgress}`, () => {
    return HttpResponse.json({
      data: missionInProgress,
    });
  }),
  http.get(`${API_URL}${PATH.submitSolution}`, () => {
    return HttpResponse.json({
      data: submittedSolutions,
    });
  }),
  http.get(`${API_URL}${PATH.myComments}`, () => {
    return HttpResponse.json({ data: myComments });
  }),
];
