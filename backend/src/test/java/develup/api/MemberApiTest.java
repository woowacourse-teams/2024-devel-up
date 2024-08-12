package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import develup.application.member.MemberResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;

class MemberApiTest extends ApiTestSupport {

    @Test
    @DisplayName("내 정보를 조회한다.")
    void getMyInfo() throws Exception {
        MemberResponse response = new MemberResponse(
                1L,
                "example@gmail.com",
                "example",
                "https://example.com/image.png"
        );
        BDDMockito.given(memberService.getMemberById(any()))
                .willReturn(response);

        mockMvc.perform(get("/members/mine"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.email", equalTo("example@gmail.com")))
                .andExpect(jsonPath("$.data.name", equalTo("example")))
                .andExpect(jsonPath("$.data.imageUrl", equalTo("https://example.com/image.png")));
    }
}
