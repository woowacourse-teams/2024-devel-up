package develup.auth;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GithubOAuthService {

    private final GithubOAuthClient githubOAuthClient;
    private final GithubOAuthProperties properties;

    public GithubOAuthService(
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
        GithubAccessTokenRequest request = new GithubAccessTokenRequest(
                code,
                properties.clientId(),
                properties.clientSecret()
        );
        GithubAccessTokenResponse response = githubOAuthClient.getAccessToken(request);

        if (response == null) {
            throw new IllegalArgumentException("액세스 토큰을 가져오는데 실패했습니다.");
        }

        return response.accessToken();
    }

    public SocialProfile getUserInfo(String accessToken) {
        SocialProfile socialProfile = githubOAuthClient.getUserInfo(accessToken);

        if (socialProfile == null) {
            throw new IllegalArgumentException("사용자 정보를 가져오는데 실패했습니다.");
        }

        return socialProfile;
    }

    public String getClientUri(String next) {
        return UriComponentsBuilder.fromHttpUrl(properties.clientUri())
                .path(next)
                .build()
                .toUriString();
    }
}
