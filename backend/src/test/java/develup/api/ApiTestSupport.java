package develup.api;

import develup.api.auth.AuthArgumentResolver;
import develup.api.auth.CookieAuthorizationExtractor;
import develup.application.auth.AuthService;
import develup.application.member.MemberService;
import develup.application.mission.MissionService;
import develup.application.solution.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
public class ApiTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @MockBean
    protected AuthService authService;

    @MockBean
    protected MemberService memberService;

    @MockBean
    protected MissionService missionService;

    @MockBean
    protected SolutionService solutionService;

    @MockBean
    protected CookieAuthorizationExtractor cookieAuthorizationExtractor;

    @MockBean
    protected AuthArgumentResolver argumentResolver;
}
