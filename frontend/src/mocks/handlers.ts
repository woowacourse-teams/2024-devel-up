import { http, HttpResponse } from 'msw';
import { PATH } from '@/apis/paths';
import missions from './missions.json';
import submittedSolutions from './SubmittedSolutions.json';
import mockSolutions from './Solutions.json';
import mockDiscussions from './Discussions.json';
import mockDiscussion from './Discussion.json';
import myComments from './myComments.json';
import missionInProgress from './missionInProgress.json';
import { HASHTAGS } from '@/constants/hashTags';
import { API_URL } from '@/apis/clients/develupClient';
import dashboardDiscussions from './dashboardDiscussion.json';
import dashboardDiscussionComments from './dashboardDiscussionComment.json';

export const handlers = [
  http.get(`https://dev.api.devel-up.co.kr/missions`, ({ request }) => {
    const url = new URL(request.url);
    // const size = url.searchParams.get('size');
    const page = url.searchParams.get('page');

    const hashTag = url.searchParams.get('hashTag');
    if (hashTag === HASHTAGS.all) {
      return HttpResponse.json({ data: missions, currentPage: Number(page) || 1, totalPage: 10 });
    }

    const filteredMissions = missions.filter((mission) => mission.hashTags[0].name === hashTag);

    const response = {
      data: filteredMissions,
      currentPage: Number(page) || 1,
      totalPage: 10,
    };

    return HttpResponse.json(response);
  }),

  http.get(`${API_URL}${PATH.mySolutions}`, () => {
    return HttpResponse.json({
      data: submittedSolutions,
      currentPage: 1,
      totalPage: 10,
    });
  }),

  http.get(`${API_URL}${PATH.missionInProgress}`, () => {
    return HttpResponse.json({
      data: missionInProgress,
      currentPage: 1,
      totalPage: 10,
    });
  }),

  http.get(`${API_URL}${PATH.myComments}`, () => {
    return HttpResponse.json({ data: myComments });
  }),

  http.get(`${API_URL}${PATH.dashboardDiscussion}`, () => {
    return HttpResponse.json({ data: dashboardDiscussions });
  }),

  http.get(`${API_URL}${PATH.dashboardDiscussionComment}`, () => {
    return HttpResponse.json({ data: dashboardDiscussionComments });
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

  http.get(`${API_URL}${PATH.solutions}/:id`, ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.pathname.split('/').pop());

    const solution = mockSolutions.find((solution) => solution.id === id);

    if (solution) {
      return HttpResponse.json({ data: solution }, { status: 200 });
    } else {
      return HttpResponse.json({ status: 404 }, { statusText: 'Solution not found' });
    }
  }),

  http.delete(`${API_URL}${PATH.solutions}/:id`, () => {
    return HttpResponse.json({ status: 200 });
  }),

  http.get(`${API_URL}${PATH.solutions}`, () => {
    return HttpResponse.json(
      { data: mockSolutions, currentPage: 1, totalPage: 10 },
      { status: 200 },
    );
  }),

  http.patch(`${API_URL}${PATH.solutions}`, async ({ request }) => {
    const { solutionId, title, description, url } = (await request.json()) as {
      solutionId: number;
      title: string;
      description: string;
      url: string;
    };

    const solutionIndex = mockSolutions.findIndex((solution) => solution.id === solutionId);

    if (solutionIndex !== -1) {
      mockSolutions[solutionIndex] = {
        ...mockSolutions[solutionIndex],
        title,
        description,
        url,
      };

      return HttpResponse.json({ data: mockSolutions[solutionIndex] }, { status: 200 });
    }

    return HttpResponse.json({ status: 404 }, { statusText: 'Solution not found' });
  }),

  http.get(`${API_URL}${PATH.discussions}`, () => {
    return HttpResponse.json(
      { data: mockDiscussions, currentPage: 1, totalPage: 10 },
      { status: 200 },
    );
  }),

  http.get(`${API_URL}${PATH.discussions}/:id`, () => {
    // id가 1번인 discussion만 리턴하도록 할게요
    return HttpResponse.json({ data: mockDiscussion }, { status: 200 });
  }),

  http.patch(`${API_URL}${PATH.discussions}`, async ({ request }) => {
    const { discussionId, title, content, missionId, hashTagIds } = (await request.json()) as {
      discussionId: number;
      title: string;
      content: string;
      missionId?: number;
      hashTagIds: number[];
    };

    mockDiscussion.content = content;

    const discussionIndex = mockDiscussions.findIndex(
      (discussion) => discussion.id === discussionId,
    );

    if (discussionIndex !== -1) {
      // missionId가 전달되었을 경우 해당 mission을 업데이트
      let mission = mockDiscussions[discussionIndex].mission;
      if (missionId) {
        const missionData = missions.find((mission) => mission.id === missionId);
        if (missionData) {
          mission = missionData.title;
        }
      }

      // hashTagIds를 hashTags 형식으로 변환하여 업데이트
      const hashTags = hashTagIds.map((id) => {
        const foundTag = mockDiscussions[discussionIndex].hashTags.find((tag) => tag.id === id);
        return foundTag ? { id: foundTag.id, name: foundTag.name } : { id, name: 'Unknown' };
      });

      // discussion 데이터를 업데이트
      mockDiscussions[discussionIndex] = {
        ...mockDiscussions[discussionIndex],
        title,
        mission,
        hashTags,
      };

      return HttpResponse.json({ status: 404 }, { statusText: 'Discussion not found' });
    }
  }),

  http.delete(`${API_URL}${PATH.discussions}/:id`, () => {
    return HttpResponse.json({ status: 200 });
  }),
];
