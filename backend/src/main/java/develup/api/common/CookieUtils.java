package develup.api.common;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtils {

    private static final String TOKEN_COOKIE_NAME = "token";
    private static final int COOKIE_MAX_AGE_ONE_DAY = 60 * 60 * 24;

    private CookieUtils() {
    }

    public static void setTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, token);
        cookie.setMaxAge(COOKIE_MAX_AGE_ONE_DAY);
        cookie.setHttpOnly(true);
        // cookie.setSecure(true); // HTTPS를 사용할 때
        cookie.setPath("/");

        response.addCookie(cookie);
    }

    public static void clearTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}
