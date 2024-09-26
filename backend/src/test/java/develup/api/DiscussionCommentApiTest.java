package develup.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
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
import develup.application.discussion.comment.CreateDiscussionCommentResponse;
import develup.application.discussion.comment.DiscussionCommentRepliesResponse;
import develup.application.discussion.comment.DiscussionCommentRequest;
import develup.application.discussion.comment.DiscussionReplyResponse;
import develup.application.discussion.comment.MyDiscussionCommentResponse;
import develup.application.discussion.comment.UpdateDiscussionCommentRequest;
import develup.application.discussion.comment.UpdateDiscussionCommentResponse;
import develup.application.member.MemberResponse;
import develup.domain.member.Member;
import develup.support.data.MemberTestData;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;

class DiscussionCommentApiTest extends ApiTestSupport {

    @Test
    @DisplayName("댓글 목록을 조회한다.")
    void getComments() throws Exception {
        DiscussionReplyResponse replyResponse = createReplyResponse();
        List<DiscussionReplyResponse> replyResponses = List.of(replyResponse);
        List<DiscussionCommentRepliesResponse> responses = List.of(createRootCommentResponse(replyResponses));

        BDDMockito.given(discussionCommentReadService.getCommentsWithReplies(any()))
                .willReturn(responses);

        mockMvc.perform(
                        get("/discussions/1/comments"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].content", equalTo("content")))
                .andExpect(jsonPath("$.data[0].replies", hasSize(1)))
                .andExpect(jsonPath("$.data[0].replies[0].id", equalTo(2)));
    }

    @Test
    @DisplayName("내가 디스커션에 작성한 댓글 목록을 조회한다.")
    void getMyComments() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        MyDiscussionCommentResponse myDiscussionCommentResponse = new MyDiscussionCommentResponse(1L, 1L, "댓글 내용", now, "디스커션 제목", 123L);
        List<MyDiscussionCommentResponse> responses = List.of(myDiscussionCommentResponse);

        BDDMockito.given(discussionCommentReadService.getMyComments(any()))
                .willReturn(responses);

        mockMvc.perform(
                        get("/discussions/comments/mine"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].discussionId", equalTo(1)))
                .andExpect(jsonPath("$.data[0].content", equalTo("댓글 내용")))
                .andExpect(jsonPath("$.data[0].createdAt").exists())
                .andExpect(jsonPath("$.data[0].discussionTitle", equalTo("디스커션 제목")))
                .andExpect(jsonPath("$.data[0].discussionCommentCount", equalTo(123)));
    }

    @Test
    @DisplayName("댓글을 추가한다.")
    void addComment() throws Exception {
        Member member = MemberTestData.defaultMember().withId(1L).build();
        MemberResponse memberResponse = MemberResponse.from(member);
        CreateDiscussionCommentResponse response = new CreateDiscussionCommentResponse(
                1L,
                1L,
                null,
                "content",
                memberResponse,
                LocalDateTime.now()
        );
        BDDMockito.given(discussionCommentWriteService.addComment(any(), any(), any()))
                .willReturn(response);

        DiscussionCommentRequest request = new DiscussionCommentRequest("content", null);
        mockMvc.perform(
                        post("/discussions/1/comments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.content", equalTo("content")))
                .andExpect(jsonPath("$.data.parentCommentId", equalTo(null)))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.createdAt").exists());
    }

    @Test
    @DisplayName("댓글 내용을 수정한다.")
    void updateComment() throws Exception {
        Member member = MemberTestData.defaultMember().withId(1L).build();
        MemberResponse memberResponse = MemberResponse.from(member);
        UpdateDiscussionCommentRequest request = new UpdateDiscussionCommentRequest("updated content");
        UpdateDiscussionCommentResponse response = new UpdateDiscussionCommentResponse(
                1L,
                1L,
                "updated content",
                memberResponse,
                LocalDateTime.now()
        );

        BDDMockito.given(discussionCommentWriteService.updateComment(any(), any(), any()))
                .willReturn(response);

        mockMvc.perform(
                        patch("/discussions/comments/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.discussionId", equalTo(1)))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andExpect(jsonPath("$.data.content", equalTo("updated content")));
    }

    @Test
    @DisplayName("댓글을 삭제한다.")
    void deleteComment() throws Exception {
        BDDMockito.doNothing()
                .when(discussionCommentWriteService)
                .deleteComment(any(), any());

        mockMvc.perform(
                        delete("/discussions/comments/1")
                                .cookie(new Cookie("token", "mock_token"))
                )
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    private DiscussionCommentRepliesResponse createRootCommentResponse(List<DiscussionReplyResponse> replyResponses) {
        return new DiscussionCommentRepliesResponse(
                1L,
                1L,
                "content",
                MemberResponse.from(MemberTestData.defaultMember().withId(1L).build()),
                replyResponses,
                LocalDateTime.now(),
                false
        );
    }

    private DiscussionReplyResponse createReplyResponse() {
        return new DiscussionReplyResponse(
                2L,
                1L,
                1L,
                "reply",
                MemberResponse.from(MemberTestData.defaultMember().withId(1L).build()),
                LocalDateTime.now()
        );
    }
}
