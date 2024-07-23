package develup.infra.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GithubAccessTokenRequest(
        String code,

        @JsonProperty("client_id")
        String clientId,

        @JsonProperty("client_secret")
        String clientSecret
) {
}
