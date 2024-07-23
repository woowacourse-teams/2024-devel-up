package develup.infra.auth.github;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("auth.github")
public record GithubOAuthProperties(
        @NotBlank
        String clientId,

        @NotBlank
        String clientSecret,

        @NotBlank
        String redirectUri,

        @NotBlank
        String clientUri
) {
}
