package develup.infra.auth.github.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import develup.application.auth.oauth.OAuthUserInfo;
import jakarta.annotation.Nullable;

@JsonNaming(SnakeCaseStrategy.class)
public record GithubUserInfoResponse(
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
