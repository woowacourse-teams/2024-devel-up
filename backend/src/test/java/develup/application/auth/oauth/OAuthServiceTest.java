package develup.application.auth.oauth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import develup.application.auth.AuthService;
import develup.application.member.MemberService;
import develup.domain.member.OAuthProvider;
import develup.support.IntegrationTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

class OAuthServiceTest extends IntegrationTestSupport {

    @MockBean
    private OAuthContext oAuthContext;

    @Autowired
    private OAuthService oAuthService;

    @Test
    @DisplayName("OAuth 로그인 URL을 반환한다.")
    void getOAuthLoginUrl() {
        OAuthProvider provider = OAuthProvider.GITHUB;
        String next = "/next";
        String expected = "https://github.com/login/oauth/authorize?next=" + next;
        given(oAuthContext.getOAuthLoginUrl(provider, next)).willReturn(expected);

        String result = oAuthService.getOAuthLoginUrl(provider, next);

        assertThat(result).isEqualTo(expected);
    }

    @Test
    @DisplayName("OAuth 로그인을 처리한다.")
    void oauthLogin() {
        OAuthProvider provider = OAuthProvider.GITHUB;
        OAuthUserInfo userInfo = new OAuthUserInfo(
                1L,
                "login",
                "https://avatar.url",
                "email@gmail.com",
                "name"
        );
        given(oAuthContext.getOAuthUserInfo(provider, "test_code"))
                .willReturn(userInfo);

        String result = oAuthService.oauthLogin(provider, "test_code");
        assertThat(result).isNotNull();
    }

    @Test
    @DisplayName("클라이언트 리다이렉트 URL을 반환한다.")
    void getClientRedirectUrl() {
        OAuthProvider provider = OAuthProvider.GITHUB;
        String next = "/next";
        String expected = "https://example.com?next=" + next;
        given(oAuthContext.getClientRedirectUrl(provider, next)).willReturn(expected);

        String result = oAuthService.getClientRedirectUrl(provider, next);

        assertThat(result).isEqualTo(expected);
    }
}
