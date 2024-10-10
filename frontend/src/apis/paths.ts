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
  dashboardDiscussion: '/discussions/mine',
  dashboardDiscussionComment: '/discussions/comments/mine',
  discussions: '/discussions',
  submitDiscussion: '/discussions/submit',
};

export const PATH_FORMATTER = {
  solutionComments: (solutionId: number) => `/solutions/${solutionId}/comments`,
  solutionSingleComment: (commentId: number) => `/solutions/comments/${commentId}`,
  discussionComments: (discussionId: number) => `/discussions/${discussionId}/comments`,
  discussionSingleComment: (commentId: number) => `/discussions/comments/${commentId}`,
};
