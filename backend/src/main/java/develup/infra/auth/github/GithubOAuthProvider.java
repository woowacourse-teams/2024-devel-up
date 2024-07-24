package develup.infra.auth.github;

import develup.application.auth.OAuthUserInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class GithubOAuthProvider {

    private final GithubOAuthClient githubOAuthClient;
    private final GithubOAuthProperties properties;

    public GithubOAuthProvider(
            GithubOAuthClient githubOAuthClient,
            GithubOAuthProperties properties
    ) {
        this.githubOAuthClient = githubOAuthClient;
        this.properties = properties;
    }

    public String getLoginUrl(String next) {
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

    public String getAccessToken(String code) {
        GithubAccessTokenResponse response = githubOAuthClient.getAccessToken(code);

        return response.accessToken();
    }

    public OAuthUserInfo getUserInfo(String accessToken) {
        GithubUserInfo githubUserInfo = githubOAuthClient.getUserInfo(accessToken);

        return githubUserInfo.toOAuthUserInfo();
    }

    public String getClientRedirectUri(String next) {
        return UriComponentsBuilder.fromHttpUrl(properties.clientUri())
                .path(next)
                .build()
                .toUriString();
    }
}
