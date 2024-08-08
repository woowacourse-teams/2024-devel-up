package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import develup.application.mission.MissionWithStartedResponse;
import develup.domain.mission.Mission;
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
                .andExpect(jsonPath("$.data[0].descriptionUrl",
                        equalTo("https://raw.githubusercontent.com/develup-mission/mission/main/README.md")))
                .andExpect(jsonPath("$.data[1].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[1].url", equalTo("https://github.com/develup/mission")))
                .andExpect(jsonPath("$.data[1].descriptionUrl",
                        equalTo("https://raw.githubusercontent.com/develup-mission/mission/main/README.md")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    @Test
    @DisplayName("미션을 조회한다.")
    void getMission() throws Exception {
        Mission mission = MissionTestData.defaultMission().withId(1L).build();
        MissionWithStartedResponse response = MissionWithStartedResponse.of(mission, false);
        BDDMockito.given(missionService.getMission(any(), anyLong()))
                .willReturn(response);

        mockMvc.perform(get("/missions/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission")))
                .andExpect(jsonPath("$.data.descriptionUrl",
                        equalTo("https://raw.githubusercontent.com/develup-mission/mission/main/README.md")))
                .andExpect(jsonPath("$.data.isStarted", is(false)));
    }
}
