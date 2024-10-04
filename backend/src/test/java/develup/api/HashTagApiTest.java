package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;

class HashTagApiTest extends ApiTestSupport {

    @Test
    @DisplayName("해시 태그 목록을 조회한다.")
    void getHashTags() throws Exception {
        List<HashTagResponse> responses = List.of(
                new HashTagResponse(1L, "JAVA"),
                new HashTagResponse(2L, "JAVASCRIPT")
        );
        BDDMockito.given(hashTagReadService.getHashTags())
                .willReturn(responses);

        mockMvc.perform(get("/hash-tags"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data[1].id", is(2)))
                .andExpect(jsonPath("$.data[1].name", equalTo("JAVASCRIPT")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }
}
