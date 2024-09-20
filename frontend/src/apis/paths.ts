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
  solutions: '/solutions',
  mySolutions: '/solutions/mine',
  discussions: '/discussions',
  submitDiscussion: '/discussions/submit',
};

export const PATH_FORMATTER = {
  solutionComments: (solutionId: number) => `/solutions/${solutionId}/comments`,
  discussionComments: (discussionId: number) => `/discussions/${discussionId}/comments`,
};
