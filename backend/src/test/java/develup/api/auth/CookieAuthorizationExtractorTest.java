package develup.api.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class CookieAuthorizationExtractorTest {

    @Mock
    private HttpServletRequest request;

    private final CookieAuthorizationExtractor extractor = new CookieAuthorizationExtractor();

    @Test
    @DisplayName("쿠키들이 없을 경우 빈 값을 반환한다.")
    void extractCookieWhenCookiesAreEmpty() {
        given(request.getCookies()).willReturn(null);

        String token = extractor.extract(request);

        assertThat(token).isNull();
    }

    @Test
    @DisplayName("'token' 쿠키에서 토큰을 추출한다.")
    void extract() {
        String tokenValue = "token_value";
        Cookie tokenCookie = new Cookie("token", tokenValue);
        Cookie[] cookies = {tokenCookie};
        given(request.getCookies()).willReturn(cookies);

        String token = extractor.extract(request);

        assertThat(token).isEqualTo(tokenValue);
    }

    @Test
    @DisplayName("'token' 쿠키가 없으면 빈 값을 반환한다.")
    void extractWhenTokenCookieDoesNotExist() {
        Cookie[] cookies = {new Cookie("another_cookie", "another_cookie_value")};

        given(request.getCookies()).willReturn(cookies);

        String result = extractor.extract(request);

        assertThat(result).isNull();
    }
}
