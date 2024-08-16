package develup.infra.auth.github;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import develup.application.auth.OAuthUserInfo;
import jakarta.annotation.Nullable;

@JsonNaming(SnakeCaseStrategy.class)
public record GithubUserInfo(
        Long id,
        String login,
        String avatarUrl,
        @Nullable String email,
        @Nullable String name
) {

    public OAuthUserInfo toOAuthUserInfo() {
        return new OAuthUserInfo(
                id,
                login,
                avatarUrl,
                email,
                name
        );
    }
}
