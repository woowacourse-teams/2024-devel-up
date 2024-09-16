package develup.domain.member;

import java.util.Arrays;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;

public enum OAuthProvider {

    GITHUB,
    ;

    public static OAuthProvider from(String provider) {
        return Arrays.stream(values())
                .filter(oauthProvider -> oauthProvider.name().equalsIgnoreCase(provider))
                .findFirst()
                .orElseThrow(() -> new DevelupException(ExceptionType.OAUTH_PROVIDER_NOT_FOUND));
    }
}
