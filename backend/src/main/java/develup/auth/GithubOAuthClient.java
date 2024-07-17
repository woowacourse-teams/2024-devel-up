package develup.auth;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GithubOAuthClient {

    private final RestClient restClient;

    public GithubOAuthClient() {
        this.restClient = RestClient.create();
    }

    public GithubAccessTokenResponse getAccessToken(GithubAccessTokenRequest request) {
        return restClient.post()
                .uri("https://github.com/login/oauth/access_token")
                .contentType(APPLICATION_JSON)
                .accept(APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GithubAccessTokenResponse.class);
    }

    public SocialProfile getUserInfo(String accessToken) {
        return restClient.get()
                .uri("https://api.github.com/user")
                .header(AUTHORIZATION, String.format("Bearer %s", accessToken))
                .accept(APPLICATION_JSON)
                .retrieve()
                .body(SocialProfile.class);
    }
}
