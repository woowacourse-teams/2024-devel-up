//TODO 쿼리키 팩토리(https://tanstack.com/query/v4/docs/framework/react/community/lukemorales-query-key-factory)
// 와 이런 저런 블로그글 을 참조해서 만들어보았습니다.
// 지금 현재 고민 되는 부분은 폴더 구조입니다. 이 구조가 맞는 구조인지 확신이 안서네요 🥲
// 블로그 글 링크(https://yogjin.tistory.com/121)
// @버건디

export const missionKeys = {
  all: ['missions'],
  detail: (id: number) => [...missionKeys.all, id],
  inProgress: ['inProgress'],
} as const;

export const solutionCommentKeys = {
  all: (solutionId: number) => ['solutionComments', solutionId],
  mine: ['mySolutionComments'],
};

export const discussionCommentKeys = {
  all: (discussionId: number) => ['discussionComments', discussionId],
  mine: ['myDiscussionComments'],
};

export const solutionKeys = {
  all: ['solutions'],
  detail: (id: number) => [...solutionKeys.all, id],
  summaries: ['solutionSummaries'],
  submitted: ['submitted solutions'],
};

export const discussionKeys = {
  all: ['discussions'],
  detail: (id: number) => [...discussionKeys.all, id],
};

export const hashTagsKeys = {
  hashTags: ['hashTags'],
};

export const userKeys = {
  info: ['userInfo'],
};

export const discussionsKeys = {
  all: ['all'],
};
