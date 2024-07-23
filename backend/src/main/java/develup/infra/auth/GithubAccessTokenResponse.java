package develup.infra.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GithubAccessTokenResponse(
        @JsonProperty("access_token")
        String accessToken,

        @JsonProperty("token_type")
        String tokenType,

        String scope
) {
}
