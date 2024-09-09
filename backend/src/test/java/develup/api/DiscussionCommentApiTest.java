package develup.api;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import develup.application.discussion.comment.DiscussionCommentCreateRequest;
import develup.application.discussion.comment.DiscussionCommentResponse;
import develup.application.discussion.comment.GroupingDiscussionCommentResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;

class DiscussionCommentApiTest extends ApiTestSupport {

    @Test
    @DisplayName("댓글 목록을 조회한다")
    void getGroupedComments() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        String nowString = now.toString();
        nowString = nowString.substring(0, nowString.indexOf("."));
        DiscussionCommentResponse rootComment = new DiscussionCommentResponse(1L, 1L, null, "루트", null, now);
        DiscussionCommentResponse rootComment2 = new DiscussionCommentResponse(2L, 1L, null, "루트2", null, now);
        List<DiscussionCommentResponse> replies = List.of(new DiscussionCommentResponse(3L, 1L, 2L, "답글", null, now));

        List<GroupingDiscussionCommentResponse> responses = List.of(
                new GroupingDiscussionCommentResponse(rootComment, new ArrayList<>()),
                new GroupingDiscussionCommentResponse(rootComment2, replies)
        );
        BDDMockito.given(discussionCommentService.getGroupingComments(any()))
                .willReturn(responses);

        mockMvc.perform(
                        get("/discussions/1/comments"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].comment.id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].comment.discussionId", equalTo(1)))
                .andExpect(jsonPath("$.data[0].comment.parentCommentId", equalTo(null)))
                .andExpect(jsonPath("$.data[0].comment.content", equalTo("루트")))
                .andExpect(jsonPath("$.data[0].comment.createdAt", containsString(nowString)))
                .andExpect(jsonPath("$.data[0].replies", empty()))
                .andExpect(jsonPath("$.data[1].replies[0].id", equalTo(3)))
                .andExpect(jsonPath("$.data[1].replies[0].discussionId", equalTo(1)))
                .andExpect(jsonPath("$.data[1].replies[0].parentCommentId", equalTo(2)))
                .andExpect(jsonPath("$.data[1].replies[0].content", equalTo("답글")))
                .andExpect(jsonPath("$.data[1].replies[0].createdAt", containsString(nowString)));
    }

    @Test
    @DisplayName("댓글을 추가한다.")
    void createComment() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        String nowString = now.toString();
        nowString = nowString.substring(0, nowString.indexOf("."));
        DiscussionCommentResponse response = new DiscussionCommentResponse(1L, 1L, null, "루트", null, now);
        BDDMockito.given(discussionCommentService.createComment(any(), any(), any()))
                .willReturn(response);

        mockMvc.perform(
                        post("/discussions/1/comments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(new DiscussionCommentCreateRequest(null, "루트"))))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.discussionId", equalTo(1)))
                .andExpect(jsonPath("$.data.parentCommentId", equalTo(null)))
                .andExpect(jsonPath("$.data.content", equalTo("루트")))
                .andExpect(jsonPath("$.data.createdAt", containsString(nowString)));
    }
}
