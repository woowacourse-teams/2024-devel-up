package develup.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("auth.github")
public record GithubOAuthProperties(String clientId, String clientSecret, String redirectUri, String clientUri) {
}
