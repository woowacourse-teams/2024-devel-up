package develup.api;

import java.io.IOException;
import develup.application.auth.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthApi {

    private static final String TOKEN_COOKIE_NAME = "token";
    private static final int COOKIE_MAX_AGE_ONE_DAY = 60 * 60 * 24;

    private final AuthService authService;

    public AuthApi(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/auth/social/redirect/github")
    public void githubRedirect(
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String redirectUri = authService.getGithubOAuthLoginUrl(next);
        response.sendRedirect(redirectUri);
    }

    @GetMapping("/auth/social/callback/github")
    public void githubCallback(
            @RequestParam("code") String code,
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String token = authService.githubOAuthLogin(code);

        setTokenCookie(response, token);

        String redirectUri = authService.getClientRedirectUri(next);
        response.sendRedirect(redirectUri);
    }

    @DeleteMapping("/auth/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        clearTokenCookie(response);

        return ResponseEntity.noContent().build();
    }

    private void setTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, token);
        cookie.setMaxAge(COOKIE_MAX_AGE_ONE_DAY);
        cookie.setHttpOnly(true);
        // cookie.setSecure(true); // HTTPS를 사용할 때만 주석을 해제하세요.
        cookie.setPath("/");

        response.addCookie(cookie);
    }

    private void clearTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}
