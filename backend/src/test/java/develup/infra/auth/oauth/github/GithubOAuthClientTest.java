package develup.infra.auth.oauth.github;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenRequest;
import develup.infra.auth.oauth.github.dto.GithubAccessTokenResponse;
import develup.infra.auth.oauth.github.dto.GithubUserInfoResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@RestClientTest(GithubOAuthClient.class)
class GithubOAuthClientTest {

    @Autowired
    private MockRestServiceServer mockServer;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private GithubOAuthClient githubOAuthClient;

    @MockBean
    private GithubOAuthProperties properties;

    @BeforeEach
    void setUp() {
        given(properties.clientId()).willReturn("client-id");
        given(properties.clientSecret()).willReturn("client-secret");
        given(properties.redirectUri()).willReturn("redirect-uri");
        given(properties.clientUri()).willReturn("client-uri");
    }

    @Test
    @DisplayName("깃허브 인증 서버에서 액세스 토큰을 가져온다.")
    void fetchAccessToken() throws JsonProcessingException {
        GithubAccessTokenResponse expectedResponse = new GithubAccessTokenResponse("access-token", "token-type", "scope");
        GithubAccessTokenRequest expectedRequest = new GithubAccessTokenRequest("code", "client-id", "client-secret");

        mockServer.expect(requestTo("https://github.com/login/oauth/access_token"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().json(objectMapper.writeValueAsString(expectedRequest)))
                .andRespond(withStatus(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(objectMapper.writeValueAsString(expectedResponse))
                );

        GithubAccessTokenResponse response = githubOAuthClient.fetchAccessToken("code");

        assertSoftly(softly -> {
            softly.assertThat(response.accessToken()).isEqualTo("access-token");
            softly.assertThat(response.tokenType()).isEqualTo("token-type");
            softly.assertThat(response.scope()).isEqualTo("scope");
        });
    }

    @Test
    @DisplayName("깃허브 사용자 정보를 가져온다.")
    void fetchUserInfo() throws JsonProcessingException {
        GithubUserInfoResponse expectedResponse = new GithubUserInfoResponse(
                1L,
                "login",
                "http://avatar.url",
                "alstn113@gmail.com",
                "name"
        );

        String accessToken = "access-token";
        mockServer.expect(requestTo("https://api.github.com/user"))
                .andExpect(method(HttpMethod.GET))
                .andExpect(header(AUTHORIZATION, "Bearer " + accessToken))
                .andRespond(withStatus(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(objectMapper.writeValueAsString(expectedResponse))
                );

        GithubUserInfoResponse response = githubOAuthClient.fetchUserInfo(accessToken);

        assertSoftly(softly -> {
            softly.assertThat(response.login()).isEqualTo("login");
            softly.assertThat(response.name()).isEqualTo("name");
            softly.assertThat(response.email()).isEqualTo("alstn113@gmail.com");
            softly.assertThat(response.avatarUrl()).isEqualTo("http://avatar.url");
        });
    }
}
