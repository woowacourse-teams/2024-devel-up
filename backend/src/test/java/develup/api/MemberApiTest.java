package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import develup.infra.auth.JwtTokenProvider;
import develup.support.IntegrationTestSupport;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.boot.test.mock.mockito.MockBean;

class MemberApiTest extends IntegrationTestSupport {

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private MemberService memberService;

    @Test
    @DisplayName("내 정보를 조회한다.")
    void getMyInfo() throws Exception {
        MemberResponse response = new MemberResponse(
                1L,
                "example@gmail.com",
                "example",
                "https://example.com/image.png"
        );
        BDDMockito.given(jwtTokenProvider.getMemberId(any()))
                .willReturn(1L);
        BDDMockito.given(memberService.getMemberById(anyLong()))
                .willReturn(response);

        mockMvc.perform(
                        get("/members/mine")
                                .cookie(new Cookie("token", "mock_token"))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.email", equalTo("example@gmail.com")))
                .andExpect(jsonPath("$.data.name", equalTo("example")))
                .andExpect(jsonPath("$.data.imageUrl", equalTo("https://example.com/image.png")));
    }
}
