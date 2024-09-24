package develup.api;

import java.io.IOException;
import develup.api.common.CookieUtils;
import develup.application.auth.oauth.OAuthService;
import develup.domain.member.OAuthProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "인증 API")
public class AuthApi {

    private final OAuthService oAuthService;

    public AuthApi(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    @GetMapping("/auth/social/redirect/{provider}")
    @Operation(summary = "OAuth 인증 API", description = "해당하는 OAuth 제공자의 로그인 페이지로 리다이렉트합니다.")
    public void githubRedirect(
            @PathVariable OAuthProvider provider,
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String redirectUri = oAuthService.getOAuthLoginUrl(provider, next);
        response.sendRedirect(redirectUri);
    }

    @GetMapping("/auth/social/callback/{provider}")
    @Operation(
            summary = "OAuth 인증 콜백 API",
            description = "OAuth 인증 서버로부터 코드를 받고, 클라이언트에게 'token' 쿠키를 주고 주어진 경로로 리다이렉트합니다."
    )
    public void githubCallback(
            @PathVariable OAuthProvider provider,
            @RequestParam("code") String code,
            @RequestParam(value = "next", defaultValue = "/") String next,
            HttpServletResponse response
    ) throws IOException {
        String token = oAuthService.oAuthLogin(provider, code);

        CookieUtils.setTokenCookie(response, token);

        String redirectUri = oAuthService.getClientRedirectUrl(provider, next);
        response.sendRedirect(redirectUri);
    }

    @DeleteMapping("/auth/logout")
    @Operation(summary = "로그아웃 API", description = "'token' 쿠키를 만료 시킵니다.")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        CookieUtils.clearTokenCookie(response);

        return ResponseEntity.noContent().build();
    }
}
