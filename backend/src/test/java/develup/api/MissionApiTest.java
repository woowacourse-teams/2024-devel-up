package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import develup.support.IntegrationTestSupport;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.boot.test.mock.mockito.MockBean;

class MissionApiTest extends IntegrationTestSupport {

    @MockBean
    private MissionService missionService;

    @Test
    @DisplayName("미션 목록을 조회한다.")
    void getMissions() throws Exception {
        List<MissionResponse> responses = List.of(
                MissionResponse.from(MissionTestData.defaultMission().build()),
                MissionResponse.from(MissionTestData.defaultMission().build())
        );
        BDDMockito.given(missionService.getMissions())
                .willReturn(responses);

        mockMvc.perform(get("/missions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[0].url", equalTo("https://github.com/develup/mission")))
                .andExpect(jsonPath("$.data[0].descriptionUrl", equalTo("https://raw.githubusercontent.com/develup-mission/mission/main/README.md")))
                .andExpect(jsonPath("$.data[1].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[1].url", equalTo("https://github.com/develup/mission")))
                .andExpect(jsonPath("$.data[1].descriptionUrl", equalTo("https://raw.githubusercontent.com/develup-mission/mission/main/README.md")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }
}
