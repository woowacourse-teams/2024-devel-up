package develup.infra.auth.oauth.github;

import develup.application.auth.oauth.OAuthStrategy;
import develup.application.auth.oauth.OAuthUserInfo;
import develup.domain.member.OAuthProvider;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenResponse;
import develup.infra.auth.oauth.github.dto.GithubUserInfoResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class GithubOAuthStrategy implements OAuthStrategy {

    private final GithubOAuthClient githubOAuthClient;
    private final GithubOAuthProperties properties;

    public GithubOAuthStrategy(GithubOAuthClient githubOAuthClient, GithubOAuthProperties properties) {
        this.githubOAuthClient = githubOAuthClient;
        this.properties = properties;
    }

    @Override
    public String buildOAuthLoginUrl(String next) {
        String redirectUriWithNext = UriComponentsBuilder.fromHttpUrl(properties.redirectUri())
                .queryParam("next", next)
                .build()
                .toUriString();

        return UriComponentsBuilder.fromHttpUrl("https://github.com/login/oauth/authorize")
                .queryParam("client_id", properties.clientId())
                .queryParam("redirect_uri", redirectUriWithNext)
                .queryParam("scope", "user:email")
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
