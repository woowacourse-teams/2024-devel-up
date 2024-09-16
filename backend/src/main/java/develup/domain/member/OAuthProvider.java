package develup.domain.member;

import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;

public enum OAuthProvider {

    GITHUB,
    ;

    public static OAuthProvider from(String provider) {
        return Optional.ofNullable(provider)
                .map(String::toUpperCase)
                .map(OAuthProvider::valueOf)
                .orElseThrow(() -> new DevelupException(ExceptionType.OAUTH_PROVIDER_NOT_FOUND));
    }
}
