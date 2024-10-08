package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionWithStartedResponse;
import develup.domain.hashtag.HashTag;
import develup.domain.mission.Mission;
import develup.support.data.HashTagTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;

class MissionApiTest extends ApiTestSupport {

    @Test
    @DisplayName("미션 목록을 조회한다.")
    void getMissions() throws Exception {
        Mission mission = createMission();
        List<MissionResponse> responses = List.of(
                MissionResponse.from(mission),
                MissionResponse.from(mission)
        );
        BDDMockito.given(missionReadService.getMissions(any()))
                .willReturn(responses);

        mockMvc.perform(get("/missions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[0].url", equalTo("https://github.com/develup-mission/java-smoking")))
                .andExpect(jsonPath("$.data[0].summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data[0].hashTags[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data[1].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[1].url", equalTo("https://github.com/develup-mission/java-smoking")))
                .andExpect(jsonPath("$.data[1].summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[1].hashTags[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[1].hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    @Test
    @DisplayName("미션을 조회한다.")
    void getMission() throws Exception {
        Mission mission = createMission();
        MissionWithStartedResponse response = MissionWithStartedResponse.of(mission, false);
        BDDMockito.given(missionReadService.getById(any(), any()))
                .willReturn(response);

        mockMvc.perform(get("/missions/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup-mission/java-smoking")))
                .andExpect(jsonPath("$.data.descriptionUrl",
                        equalTo("https://raw.githubusercontent.com/develup-mission/java-smoking/main/README.md")))
                .andExpect(jsonPath("$.data.isStarted", is(false)))
                .andExpect(jsonPath("$.data.hashTags[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data.hashTags[0].name", equalTo("JAVA")));
    }

    @Test
    @DisplayName("사용자가 시작한 미션 목록을 조회한다.")
    void getInProgressMissions() throws Exception {
        List<MissionResponse> responses = List.of(
                MissionResponse.from(MissionTestData.defaultMission().build()),
                MissionResponse.from(MissionTestData.defaultMission().build())
        );
        BDDMockito.given(missionReadService.getInProgressMissions(any()))
                .willReturn(responses);

        mockMvc.perform(get("/missions/in-progress"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[0].url", equalTo("https://github.com/develup-mission/java-smoking")))
                .andExpect(jsonPath("$.data[0].summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data[1].title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[1].url", equalTo("https://github.com/develup-mission/java-smoking")))
                .andExpect(jsonPath("$.data[1].summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    private Mission createMission() {
        HashTag hashTag = HashTagTestData.defaultHashTag()
                .withId(1L)
                .build();

        return MissionTestData.defaultMission()
                .withId(1L)
                .withHashTags(List.of(hashTag))
                .build();
    }
}
