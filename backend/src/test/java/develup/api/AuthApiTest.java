package develup.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;

class AuthApiTest extends ApiTestSupport {

    @Test
    @DisplayName("github 로그인 페이지로 리다이렉트한다.")
    void githubRedirect() throws Exception {
        String next = "/sub";
        String expectedRedirectUri = "https://github.com/test/?next=" + next;
        BDDMockito.given(authService.getGithubOAuthLoginUrl(next))
                .willReturn(expectedRedirectUri);

        mockMvc.perform(get("/auth/social/redirect/github")
                        .param("next", next))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(header().string("Location", expectedRedirectUri));
    }

    @Test
    @DisplayName("github 로그인 콜백을 처리한다.")
    void githubCallback() throws Exception {
        String code = "test_code";
        String token = "mock_token";
        String next = "/sub";
        String expectedRedirectUri = "https://example.com?next=" + next;
        BDDMockito.given(authService.githubOAuthLogin(code))
                .willReturn(token);
        BDDMockito.given(authService.getClientRedirectUri(next))
                .willReturn(expectedRedirectUri);

        mockMvc.perform(get("/auth/social/callback/github")
                        .param("code", code)
                        .param("next", next))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(cookie().value("token", token))
                .andExpect(header().string("Location", expectedRedirectUri));
    }

    @Test
    @DisplayName("로그아웃한다.")
    void logout() throws Exception {
        mockMvc.perform(
                        delete("/auth/logout")
                                .cookie(new Cookie("token", "mock_token"))
                )
                .andDo(print())
                .andExpect(status().isNoContent())
                .andExpect(cookie().maxAge("token", 0));
    }
}
