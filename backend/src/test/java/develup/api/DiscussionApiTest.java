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
import develup.application.discussion.CreateDiscussionRequest;
import develup.application.discussion.DiscussionResponse;
import develup.application.discussion.SummarizedDiscussionResponse;
import develup.domain.discussion.Discussion;
import develup.domain.hashtag.HashTag;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;

public class DiscussionApiTest extends ApiTestSupport {

    @Test
    @DisplayName("디스커션 목록을 조회한다.")
    void getSolutions() throws Exception {
        List<SummarizedDiscussionResponse> responses = List.of(
                SummarizedDiscussionResponse.from(createDiscussion()),
                SummarizedDiscussionResponse.from(createDiscussion())
        );
        BDDMockito.given(discussionService.getSummaries(any(), any()))
                .willReturn(responses);

        mockMvc.perform(get("/discussions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속 구현에 대한 고찰")))
                .andExpect(jsonPath("$.data[0].mission", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[0].hashTags[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data[0].member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data[0].commentCount", equalTo(100)))
                .andExpect(jsonPath("$.data.length()", is(2)));
    }

    @Test
    @DisplayName("디스커션을 제출한다.")
    void createNewDiscussion() throws Exception {
        DiscussionResponse response = DiscussionResponse.from(createDiscussion());
        CreateDiscussionRequest request = new CreateDiscussionRequest(
                "루터회관 흡연단속 구현에 대한 고찰",
                "루터회관 흡연단속을 구현하면서 느낀 점을 공유합니다.",
                1L,
                List.of(1L)
        );
        BDDMockito.given(discussionService.create(any(), any()))
                .willReturn(response);

        mockMvc.perform(
                        post("/discussions/submit")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)));
    }

    @Test
    @DisplayName("디스커션을 조회한다.")
    void getSolution() throws Exception {
        DiscussionResponse response = DiscussionResponse.from(createDiscussion());
        BDDMockito.given(discussionService.getById(any()))
                .willReturn(response);

        mockMvc.perform(get("/discussions/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.title", equalTo("루터회관 흡연단속 구현에 대한 고찰")))
                .andExpect(jsonPath("$.data.content", equalTo("루터회관 흡연단속을 구현하면서 느낀 점을 공유합니다.")))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.member.email", equalTo("email@email.com")))
                .andExpect(jsonPath("$.data.member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data.member.imageUrl", equalTo("image.com/1.jpg")))
                .andExpect(jsonPath("$.data.hashTags[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data.hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data.mission.id", equalTo(1)))
                .andExpect(jsonPath("$.data.mission.title", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data.mission.summary", equalTo("담배피다 걸린 행성이를 위한 벌금 계산 미션")))
                .andExpect(jsonPath("$.data.mission.thumbnail", equalTo("https://thumbnail.com/1.png")))
                .andExpect(jsonPath("$.data.mission.url", equalTo("https://github.com/develup-mission/java-smoking")));
    }

    @Test
    @DisplayName("나의 디스커션 목록을 조회한다.")
    void getMyDiscussions() throws Exception {
        List<SummarizedDiscussionResponse> myDiscussions = List.of(
                SummarizedDiscussionResponse.from(createDiscussion()),
                SummarizedDiscussionResponse.from(createDiscussion())
        );

        BDDMockito.given(discussionService.getDiscussionsByMemberId(any()))
                .willReturn(myDiscussions);

        mockMvc.perform(get("/discussions/mine"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].title", equalTo("루터회관 흡연단속 구현에 대한 고찰")))
                .andExpect(jsonPath("$.data[0].mission", equalTo("루터회관 흡연단속")))
                .andExpect(jsonPath("$.data[0].hashTags[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].hashTags[0].name", equalTo("JAVA")))
                .andExpect(jsonPath("$.data[0].member.id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].member.name", equalTo("tester")))
                .andExpect(jsonPath("$.data[0].commentCount", equalTo(100)));
    }

    private Discussion createDiscussion() {
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

        return DiscussionTestData.defaultDiscussion()
                .withId(1L)
                .withMission(mission)
                .withMember(member)
                .withHashTags(List.of(hashTag))
                .build();
    }
}
