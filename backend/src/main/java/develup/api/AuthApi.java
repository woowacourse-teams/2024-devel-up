package develup.api;

import java.io.IOException;
import develup.api.common.CookieUtils;
import develup.application.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "인증 API")
public class AuthApi {
//
    private final AuthService authService;

    public AuthApi(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/auth/social/redirect/github")
    @Operation(summary = "깃허브 인증 API", description = "깃허브 로그인 페이지로 리다이렉트합니다.")
    public void githubRedirect(
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String redirectUri = authService.getGithubOAuthLoginUrl(next);
        response.sendRedirect(redirectUri);
    }

    @GetMapping("/auth/social/callback/github")
    @Operation(
            summary = "깃허브 인증 콜백 API",
            description = "깃허브 인증 서버로부터 코드를 받고, 클라이언트에게 'token' 쿠키를 주고 주어진 경로로 리다이렉트합니다."
    )
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
    @Operation(summary = "로그아웃 API", description = "'token' 쿠키를 만료 시킵니다.")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        CookieUtils.clearTokenCookie(response);

        return ResponseEntity.noContent().build();
    }
}
