package develup.infra.auth.oauth.github;

import java.time.Duration;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("auth.github")
public record GithubOAuthProperties(
        @NotBlank String clientId,
        @NotBlank String clientSecret,
        @NotBlank String redirectUri,
        @NotBlank String clientUri,
        @NotNull Duration connectionTimeoutSeconds,
        @NotNull Duration readTimeoutSeconds
) {
}
