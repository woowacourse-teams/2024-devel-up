package develup.api;

import java.io.IOException;
import develup.api.common.CookieUtils;
import develup.application.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthApi {
//
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

        CookieUtils.setTokenCookie(response, token);

        String redirectUri = authService.getClientRedirectUri(next);
        response.sendRedirect(redirectUri);
    }

    @DeleteMapping("/auth/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        CookieUtils.clearTokenCookie(response);

        return ResponseEntity.noContent().build();
    }
}
