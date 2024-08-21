export const PATH = {
  missionList: '/missions',
  submissions: '/submissions',
  // missionInProgress: '/submissions/now',
  githubLogin: '/auth/social/redirect/github',
  userInfo: '/members/mine',
  // submissionsInProgress: '/submissions/now',
  pairReview: '/pair-review',
  solutionSummaries: '/solutions',
  submitSolution: '/solutions/submit',
  startSolution: '/solutions/start',
  myComments: '/solutions/comments/mine',
  logout: '/auth/logout',
  hashTags: '/hash-tags',
  missionInProgress: '/missions/in-progress',
};

export const PATH_FORMATTER = {
  comments: (solutionId: number) => `/solutions/${solutionId}/comments`,
};
