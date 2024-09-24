package develup.infra.auth.oauth.github;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import java.time.Duration;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenRequest;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenResponse;
import develup.infra.auth.oauth.github.dto.GithubUserInfoResponse;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GithubOAuthClient {

    private final GithubOAuthProperties properties;
    private final RestClient restClient;

    public GithubOAuthClient(GithubOAuthProperties properties, RestClient.Builder restClientBuilder) {
        this.properties = properties;
        this.restClient = createRestClient(restClientBuilder);
    }

    private RestClient createRestClient(RestClient.Builder restClientBuilder) {
        return restClientBuilder.requestFactory(clientHttpRequestFactory()).build();
    }

    private ClientHttpRequestFactory clientHttpRequestFactory() {
        ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
                .withConnectTimeout(properties.connectionTimeoutSeconds())
                .withReadTimeout(properties.readTimeoutSeconds());

        return ClientHttpRequestFactories.get(settings);
    }

    public GithubAccessTokenResponse fetchAccessToken(String code) {
        GithubAccessTokenRequest request = new GithubAccessTokenRequest(
                code,
                properties.clientId(),
                properties.clientSecret()
        );

        return restClient.post()
                .uri("https://github.com/login/oauth/access_token")
                .contentType(APPLICATION_JSON)
                .accept(APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GithubAccessTokenResponse.class);
    }

    public GithubUserInfoResponse fetchUserInfo(String accessToken) {
        return restClient.get()
                .uri("https://api.github.com/user")
                .header(AUTHORIZATION, String.format("Bearer %s", accessToken))
                .accept(APPLICATION_JSON)
                .retrieve()
                .body(GithubUserInfoResponse.class);
    }
}
