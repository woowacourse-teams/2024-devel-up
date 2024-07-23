package develup.infra.auth;

import java.util.Arrays;
import develup.application.auth.AuthorizationExtractor;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CookieAuthorizationExtractor implements AuthorizationExtractor<String> {

    private static final String TOKEN_COOKIE_NAME = "token";

    @Override
    public String extract(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return null;
        }

        return Arrays.stream(cookies)
                .filter(cookie -> TOKEN_COOKIE_NAME.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
