package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.solution.MySolutionResponse;
import develup.application.solution.SolutionResponse;
import develup.application.solution.StartSolutionRequest;
import develup.application.solution.SubmitSolutionRequest;
import develup.application.solution.SummarizedSolutionResponse;
import develup.application.solution.UpdateSolutionRequest;
import develup.domain.hashtag.HashTag;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.solution.Solution;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;

class SolutionApiTest extends ApiTestSupport {

    @Test
    @DisplayName("솔루션 목록을 조회한다.")
    void getSolutions() throws Exception {
        List<SummarizedSolutionResponse> responses = List.of(
                SummarizedSolutionResponse.from(createSolution()),
                SummarizedSolutionResponse.from(createSolution())
        );
        BDDMockito.given(solutionReadService.getCompletedSummaries(any()))
                .willReturn(responses);

        mockMvc.perform(get("/solutions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data[0].description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data[0].hashTags[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    @Test
    @DisplayName("솔루션을 조회한다.")
    void getSolution() throws Exception {
        SolutionResponse response = SolutionResponse.from(createSolution());
        BDDMockito.given(solutionReadService.getById(any()))
                .willReturn(response);

        mockMvc.perform(get("/solutions/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup-mission/java-smoking")));
    }

    @Test
    @DisplayName("솔루션을 제출한다.")
    void submitSolution() throws Exception {
        SolutionResponse response = SolutionResponse.from(createSolution());
        SubmitSolutionRequest request = new SubmitSolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup/mission/pull/1");
        BDDMockito.given(solutionWriteService.submit(any(), any()))
                .willReturn(response);

        mockMvc.perform(post("/solutions/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup-mission/java-smoking")));
    }

    @Test
    @DisplayName("솔루션을 수정한다.")
    void updateSolution() throws Exception {
        SolutionResponse response = SolutionResponse.from(createSolution());
        UpdateSolutionRequest request = new UpdateSolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup/mission/pull/1");
        BDDMockito.given(solutionWriteService.update(any(), any()))
                .willReturn(response);

        mockMvc.perform(patch("/solutions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup-mission/java-smoking")));
    }

    @Test
    @DisplayName("솔루션을 삭제한다.")
    void deleteSolution() throws Exception {
        BDDMockito.doNothing()
                .when(solutionWriteService)
                .delete(any(), any());

        mockMvc.perform(delete("/solutions/{solutionId}", 1L))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("솔루션을 시작한다.")
    void startSolution() throws Exception {
        SolutionResponse response = SolutionResponse.start(createSolution());
        BDDMockito.given(solutionWriteService.startMission(any(), any()))
                .willReturn(response);
        StartSolutionRequest request = new StartSolutionRequest(1L);

        mockMvc.perform(
                        post("/solutions/start")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo(null)))
                .andExpect(jsonPath("$.data.description", equalTo(null)))
                .andExpect(jsonPath("$.data.url", equalTo(null)))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup-mission/java-smoking")));
    }

    @Test
    @DisplayName("나의 솔루션 목록을 조회한다.")
    void getMySolutions() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        List<MySolutionResponse> mySolutions = List.of(
                new MySolutionResponse(1L, "thumbnail", "title", now),
                new MySolutionResponse(2L, "thumbnail", "title", now)
        );
        BDDMockito.given(solutionReadService.getSubmittedSolutionsByMemberId(any()))
                .willReturn(mySolutions);

        mockMvc.perform(get("/solutions/mine"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("thumbnail")))
                .andExpect(jsonPath("$.data[0].title", equalTo("title")))
                .andExpect(jsonPath("$.data[0].createdAt").exists())
                .andExpect(jsonPath("$.data[1].id", equalTo(2)))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("thumbnail")))
                .andExpect(jsonPath("$.data[1].title", equalTo("title")))
                .andExpect(jsonPath("$.data[1].createdAt").exists());
    }

    private Solution createSolution() {
        HashTag hashTag = HashTagTestData.defaultHashTag()
                .withId(1L)
                .build();
        Member member = MemberTestData.defaultMember()
                .withId(1L)
                .build();
        Mission mission = MissionTestData.defaultMission()
                .withId(1L)
                .withHashTags(List.of(hashTag))
                .build();

        return SolutionTestData.defaultSolution()
                .withId(1L)
                .withMission(mission)
                .withMember(member)
                .build();
    }
}
