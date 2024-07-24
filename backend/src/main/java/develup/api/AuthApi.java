package develup.api;

import java.io.IOException;
import develup.application.auth.AuthService;
import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import develup.domain.member.Provider;
import develup.infra.auth.GithubOAuthService;
import develup.infra.auth.SocialProfile;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthApi {
    //te
    private final GithubOAuthService githubOAuthService;
    private final MemberService memberService;
    private final AuthService authService;

    public AuthApi(GithubOAuthService githubOAuthService, MemberService memberService, AuthService authService) {
        this.githubOAuthService = githubOAuthService;
        this.memberService = memberService;
        this.authService = authService;
    }

    @GetMapping("/auth/social/redirect/github")
    public void githubRedirect(
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String redirectUri = githubOAuthService.getLoginUrl(next);
        response.sendRedirect(redirectUri);
    }

    @GetMapping("/auth/social/callback/github")
    public void githubCallback(
            @RequestParam("code") String code,
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String accessToken = githubOAuthService.getAccessToken(code);
        SocialProfile socialProfile = githubOAuthService.getUserInfo(accessToken);

        MemberResponse memberResponse = memberService.findOrCreateMember(socialProfile, Provider.GITHUB);
        String token = authService.createToken(memberResponse.id());

        String redirectUri = githubOAuthService.getClientUri(next, token);
        response.sendRedirect(redirectUri);
    }
}
