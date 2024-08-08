package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import develup.api.auth.AuthArgumentResolver;
import develup.application.auth.Accessor;
import develup.application.solution.SolutionRequest;
import develup.application.solution.SolutionResponse;
import develup.application.solution.SolutionService;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionSummary;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

class SolutionApiTest extends IntegrationTestSupport {

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SolutionRepository solutionRepository;

    @MockBean
    private SolutionService solutionService;

    @MockBean
    private AuthArgumentResolver argumentResolver;

    @Test
    @DisplayName("솔루션 목록을 조회한다.")
    void getSolutions() throws Exception {
        List<SolutionSummary> summaries = List.of(
                new SolutionSummary(1L, "thumbnail", "value", "description"),
                new SolutionSummary(2L, "thumbnail", "value", "description")
        );
        BDDMockito.given(solutionService.getCompletedSummaries())
                .willReturn(summaries);

        mockMvc.perform(get("/solutions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].title", equalTo("value")))
                .andExpect(jsonPath("$.data[0].thumbnail", equalTo("thumbnail")))
                .andExpect(jsonPath("$.data[0].description", equalTo("description")))
                .andExpect(jsonPath("$.data[1].id", equalTo(2)))
                .andExpect(jsonPath("$.data[1].title", equalTo("value")))
                .andExpect(jsonPath("$.data[1].thumbnail", equalTo("thumbnail")))
                .andExpect(jsonPath("$.data[1].description", equalTo("description")))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    @Test
    @DisplayName("솔루션을 조회한다.")
    void getSolution() throws Exception {
        SolutionResponse solutionResponse = SolutionResponse.from(SolutionTestData.defaultSolution()
                .withMission(MissionTestData.defaultMission().withId(1L).build())
                .withMember(MemberTestData.defaultMember().withId(1L).build())
                .withId(1L)
                .build());
        BDDMockito.given(solutionService.getById(any()))
                .willReturn(solutionResponse);

        mockMvc.perform(get("/solutions/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.provider", equalTo("GITHUB")))
                .andExpect(jsonPath("$.data.member.socialId", equalTo(1234)))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup/mission")));
    }

    @Test
    @DisplayName("솔루션을 제출한다.")
    void createSolution() throws Exception {
        Solution solution = SolutionTestData.defaultSolution()
                .withMission(MissionTestData.defaultMission().withId(1L).build())
                .withMember(MemberTestData.defaultMember().withId(1L).build())
                .withId(1L)
                .build();
        SolutionResponse response = SolutionResponse.from(solution);
        SolutionRequest request = new SolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup/mission/pull/1");
        BDDMockito.given(solutionService.create(any(Accessor.class), any(SolutionRequest.class)))
                .willReturn(response);

        mockMvc.perform(post("/solutions/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.provider", equalTo("GITHUB")))
                .andExpect(jsonPath("$.data.member.socialId", equalTo(1234)))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup/mission")));
    }

    @Test
    @DisplayName("솔루션을 시작한다.")
    void startSolution() throws Exception {
        Solution solution = SolutionTestData.defaultSolution()
                .withMission(MissionTestData.defaultMission().withId(1L).build())
                .withMember(MemberTestData.defaultMember().withId(1L).build())
                .withId(1L)
                .build();


        BDDMockito.given(argumentResolver.resolveArgument(any(), any(), any(), any()))
                .willReturn(new Accessor(1L));
        BDDMockito.given(solutionService.startMission(any(), any()))
                .willReturn(solution);

        StartSolutionRequest request = new StartSolutionRequest(1L);

        mockMvc.perform(
                        post("/solutions/start")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 제출합니다.")))
                .andExpect(jsonPath("$.data.description", equalTo("안녕하세요. 피드백 잘 부탁 드려요.")))
                .andExpect(jsonPath("$.data.url", equalTo("https://github.com/develup/mission/pull/1")))
                .andExpect(jsonPath("$.data.status", equalTo("COMPLETED")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.provider", equalTo("GITHUB")))
                .andExpect(jsonPath("$.data.member.socialId", equalTo(1234)))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup/mission")));
    }
}
