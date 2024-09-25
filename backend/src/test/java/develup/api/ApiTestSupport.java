package develup.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import develup.api.auth.AuthArgumentResolver;
import develup.api.auth.CookieAuthorizationExtractor;
import develup.application.auth.AuthService;
import develup.application.auth.oauth.OAuthService;
import develup.application.discussion.DiscussionReadService;
import develup.application.discussion.DiscussionWriteService;
import develup.application.discussion.comment.DiscussionCommentReadService;
import develup.application.discussion.comment.DiscussionCommentWriteService;
import develup.application.hashtag.HashTagReadService;
import develup.application.member.MemberReadService;
import develup.application.member.MemberWriteService;
import develup.application.mission.MissionReadService;
import develup.application.solution.SolutionReadService;
import develup.application.solution.SolutionWriteService;
import develup.application.solution.comment.SolutionCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
public class ApiTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected AuthService authService;

    @MockBean
    protected OAuthService oAuthService;

    @MockBean
    protected MemberWriteService memberWriteService;

    @MockBean
    protected MemberReadService memberReadService;

    @MockBean
    protected MissionReadService missionReadService;

    @MockBean
    protected SolutionWriteService solutionWriteService;

    @MockBean
    protected SolutionReadService solutionReadService;

    @MockBean
    protected SolutionCommentService solutionCommentService;

    @MockBean
    protected HashTagReadService hashTagReadService;

    @MockBean
    protected DiscussionWriteService discussionWriteService;

    @MockBean
    protected DiscussionReadService discussionReadService;

    @MockBean
    protected DiscussionCommentWriteService discussionCommentWriteService;

    @MockBean
    protected DiscussionCommentReadService discussionCommentReadService;

    @MockBean
    protected AuthArgumentResolver argumentResolver;

    @MockBean
    protected CookieAuthorizationExtractor cookieAuthorizationExtractor;
}
