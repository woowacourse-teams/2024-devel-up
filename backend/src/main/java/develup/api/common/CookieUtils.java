package develup.api.common;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;

public class CookieUtils {

    private static final String TOKEN_COOKIE_NAME = "token";
    private static final int COOKIE_MAX_AGE_ONE_DAY = 60 * 60 * 24;
    public static final String DOMAIN = ".devel-up.co.kr";

    private CookieUtils() {
    }

    public static void setTokenCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from(TOKEN_COOKIE_NAME, token)
                .maxAge(COOKIE_MAX_AGE_ONE_DAY)
                .httpOnly(true)
                .secure(true)
                .domain(DOMAIN)
                .path("/")
                .build();

        response.setHeader("Set-Cookie", cookie.toString());
    }

    public static void clearTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(TOKEN_COOKIE_NAME, "")
                .maxAge(0)
                .httpOnly(true)
                .secure(true)
                .domain(DOMAIN)
                .path("/")
                .build();

        response.setHeader("Set-Cookie", cookie.toString());
    }
}
