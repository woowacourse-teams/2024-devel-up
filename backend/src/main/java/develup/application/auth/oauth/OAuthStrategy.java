package develup.application.auth.oauth;

import develup.domain.member.OAuthProvider;

public interface OAuthStrategy {

    String buildOAuthLoginUrl(String next);

    OAuthUserInfo fetchOAuthUserInfo(String code);

    String buildClientRedirectUrl(String next);

    OAuthProvider getProvider();
}
