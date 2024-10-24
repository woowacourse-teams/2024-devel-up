package develup.infra.auth.oauth.github;

import develup.application.auth.oauth.OAuthStrategy;
import develup.application.auth.oauth.OAuthUserInfo;
import develup.domain.member.OAuthProvider;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenResponse;
import develup.infra.auth.oauth.github.dto.GithubUserInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Component
public class GithubOAuthStrategy implements OAuthStrategy {

    private final GithubOAuthClient githubOAuthClient;
    private final GithubOAuthProperties properties;

    @Override
    public String buildOAuthLoginUrl(String next) {
        String redirectUriWithNext = UriComponentsBuilder.fromHttpUrl(properties.redirectUri())
                .queryParam("next", next)
                .build()
                .toUriString();

        return UriComponentsBuilder.fromHttpUrl("https://github.com/login/oauth/authorize")
                .queryParam("client_id", properties.clientId())
                .queryParam("redirect_uri", redirectUriWithNext)
                .build()
                .toUriString();
    }

    @Override
    public OAuthUserInfo fetchOAuthUserInfo(String code) {
        GithubAccessTokenResponse accessTokenResponse = githubOAuthClient.fetchAccessToken(code);
        String accessToken = accessTokenResponse.accessToken();

        GithubUserInfoResponse userInfoResponse = githubOAuthClient.fetchUserInfo(accessToken);

        return userInfoResponse.toOAuthUserInfo();
    }

    @Override
    public String buildClientRedirectUrl(String next) {
        return UriComponentsBuilder.fromHttpUrl(properties.clientUri())
                .path(next)
                .build()
                .toUriString();
    }

    @Override
    public OAuthProvider getProvider() {
        return OAuthProvider.GITHUB;
    }
}
