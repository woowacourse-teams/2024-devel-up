package develup.api.common;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;

public class CookieUtils {

    private static final String TOKEN_COOKIE_NAME = "token";
    private static final int COOKIE_MAX_AGE_ONE_DAY = 60 * 60 * 24;

    private CookieUtils() {
    }

    public static void setTokenCookie(HttpServletResponse response, String token) {
        ResponseCookie responseCookie = ResponseCookie.from(TOKEN_COOKIE_NAME, token)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(COOKIE_MAX_AGE_ONE_DAY)
                .build();

        response.addHeader("Set-Cookie", responseCookie.toString());
    }

    public static void clearTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}
