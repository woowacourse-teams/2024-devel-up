package develup.infra.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

class JwtTokenProviderTest {

    private final String testSecretKey = "test-secret-test-secret-test-secret-test-secret";
    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider(new JwtTokenProperties(testSecretKey, 3600000L));

    @Test
    @DisplayName("토큰을 생성한다.")
    void createToken() {
        String token = jwtTokenProvider.createToken("1");

        assertThatCode(() -> jwtTokenProvider.getMemberId(token))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("토큰에서 멤버 아이디를 가져온다.")
    void getMemberId() {
        String token = jwtTokenProvider.createToken("1");

        Long memberId = jwtTokenProvider.getMemberId(token);

        assertThat(memberId).isEqualTo(1L);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("토큰에서 멤버 아이디를 가져올 때, 토큰이 비어있으면 예외를 발생시킨다.")
    void getMemberIdWhenTokenIsEmpty(String token) {
        assertThatThrownBy(() -> jwtTokenProvider.getMemberId(token))
                .isInstanceOf(DevelupException.class)
                .hasMessage(ExceptionType.TOKEN_NOT_FOUND.getMessage());
    }


    @Test
    @DisplayName("토큰에서 멤버 아이디를 가져올 때, 토큰이 만료되었으면 예외를 발생시킨다.")
    void getMemberIdWhenTokenIsExpired() {
        JwtTokenProvider expiredJwtTokenProvider = new JwtTokenProvider(new JwtTokenProperties(testSecretKey, 1L));
        String token = expiredJwtTokenProvider.createToken("1");

        assertThatThrownBy(() -> expiredJwtTokenProvider.getMemberId(token))
                .isInstanceOf(DevelupException.class)
                .hasMessage(ExceptionType.TOKEN_EXPIRED.getMessage());
    }

    @Test
    @DisplayName("토큰에서 멤버 아이디를 가져올 때, 유효하지 않은 토큰이면 예외를 발생시킨다.")
    void getMemberIdWhenTokenIsInvalid() {
        String invalidToken = "invalid-token";

        assertThatThrownBy(() -> jwtTokenProvider.getMemberId(invalidToken))
                .isInstanceOf(DevelupException.class)
                .hasMessage(ExceptionType.INVALID_TOKEN.getMessage());
    }
}
