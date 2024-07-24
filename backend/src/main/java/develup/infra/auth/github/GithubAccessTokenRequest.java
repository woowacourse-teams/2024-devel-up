package develup.infra.auth.github;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record GithubAccessTokenRequest(String code, String clientId, String clientSecret) {
}
