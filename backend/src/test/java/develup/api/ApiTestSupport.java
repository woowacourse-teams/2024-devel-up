package develup.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import develup.api.auth.AuthArgumentResolver;
import develup.api.auth.CookieAuthorizationExtractor;
import develup.application.auth.AuthService;
import develup.application.discussion.DiscussionService;
import develup.application.discussion.comment.DiscussionCommentService;
import develup.application.hashtag.HashTagService;
import develup.application.member.MemberService;
import develup.application.mission.MissionService;
import develup.application.solution.SolutionService;
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
    protected MemberService memberService;

    @MockBean
    protected MissionService missionService;

    @MockBean
    protected SolutionService solutionService;

    @MockBean
    protected SolutionCommentService solutionCommentService;

    @MockBean
    protected HashTagService hashTagService;

    @MockBean
    protected DiscussionService discussionService;

    @MockBean
    protected DiscussionCommentService discussionCommentService;

    @MockBean
    protected AuthArgumentResolver argumentResolver;

    @MockBean
    protected CookieAuthorizationExtractor cookieAuthorizationExtractor;
}
