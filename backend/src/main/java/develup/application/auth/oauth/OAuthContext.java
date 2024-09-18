package develup.application.auth.oauth;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.OAuthProvider;
import org.springframework.stereotype.Component;

@Component
public class OAuthContext {

    private final OAuthStrategyRegistry oAuthStrategyRegistry;

    public OAuthContext(OAuthStrategyRegistry oAuthStrategyRegistry) {
        this.oAuthStrategyRegistry = oAuthStrategyRegistry;
    }

    public String getOAuthLoginUrl(OAuthProvider provider, String next) {
        OAuthStrategy strategy = getOAuthStrategy(provider);
        return strategy.buildOAuthLoginUrl(next);
    }

    public OAuthUserInfo getOAuthUserInfo(OAuthProvider provider, String code) {
        OAuthStrategy strategy = getOAuthStrategy(provider);
        return strategy.fetchOAuthUserInfo(code);
    }

    public String getClientRedirectUrl(OAuthProvider provider, String next) {
        OAuthStrategy strategy = getOAuthStrategy(provider);
        return strategy.buildClientRedirectUrl(next);
    }

    private OAuthStrategy getOAuthStrategy(OAuthProvider provider) {
        return oAuthStrategyRegistry.getOAuthStrategy(provider)
                .orElseThrow(() -> new DevelupException(ExceptionType.OAUTH_PROVIDER_NOT_FOUND));
    }
}
