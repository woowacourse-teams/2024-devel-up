package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
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
