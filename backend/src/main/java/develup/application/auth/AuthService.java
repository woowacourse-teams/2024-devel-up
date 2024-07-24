package develup.application.auth;

import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import develup.domain.member.Provider;
import develup.infra.auth.github.GithubOAuthProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final GithubOAuthProvider githubOAuthProvider;

    public AuthService(
            MemberService memberService,
            TokenProvider tokenProvider,
            GithubOAuthProvider githubOAuthProvider
    ) {
        this.memberService = memberService;
        this.tokenProvider = tokenProvider;
        this.githubOAuthProvider = githubOAuthProvider;
    }

    public String getGithubOAuthLoginUrl(String next) {
        return githubOAuthProvider.getLoginUrl(next);
    }

    public String githubOAuthLogin(String code) {
        String accessToken = githubOAuthProvider.getAccessToken(code);
        OAuthUserInfo userInfo = githubOAuthProvider.getUserInfo(accessToken);

        MemberResponse memberResponse = memberService.findOrCreateMember(userInfo, Provider.GITHUB);
        return tokenProvider.createToken(memberResponse.id().toString());
    }

    public String getClientRedirectUri(String next) {
        return githubOAuthProvider.getClientRedirectUri(next);
    }

    public Long getMemberIdByToken(String token) {
        return tokenProvider.getMemberId(token);
    }
}
