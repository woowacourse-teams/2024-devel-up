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
import develup.application.member.MemberResponse;
import develup.application.solution.comment.CreateSolutionCommentResponse;
import develup.application.solution.comment.MySolutionCommentResponse;
import develup.application.solution.comment.SolutionCommentRepliesResponse;
import develup.application.solution.comment.SolutionCommentRequest;
import develup.application.solution.comment.SolutionReplyResponse;
import develup.application.solution.comment.UpdateSolutionCommentRequest;
import develup.application.solution.comment.UpdateSolutionCommentResponse;
import develup.domain.member.Member;
import develup.support.data.MemberTestData;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;

class SolutionCommentApiTest extends ApiTestSupport {

    @Test
    @DisplayName("댓글 목록을 조회한다.")
    void getComments() throws Exception {
        SolutionReplyResponse replyResponse = createReplyResponse();
        List<SolutionReplyResponse> replyResponses = List.of(replyResponse);
        List<SolutionCommentRepliesResponse> responses = List.of(createRootCommentResponse(replyResponses));

        BDDMockito.given(solutionCommentReadService.getCommentsWithReplies(any()))
                .willReturn(responses);

        mockMvc.perform(
                        get("/solutions/1/comments"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].content", equalTo("content")))
                .andExpect(jsonPath("$.data[0].replies", hasSize(1)))
                .andExpect(jsonPath("$.data[0].replies[0].id", equalTo(2)));
    }

    @Test
    @DisplayName("내가 솔루션에 작성한 댓글 목록을 조회한다.")
    void getMyComments() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        MySolutionCommentResponse mySolutionCommentResponse = new MySolutionCommentResponse(1L, 1L, "댓글 내용", now, "솔루션 제목");
        List<MySolutionCommentResponse> responses = List.of(mySolutionCommentResponse);

        BDDMockito.given(solutionCommentReadService.getMyComments(any()))
                .willReturn(responses);

        mockMvc.perform(
                        get("/solutions/comments/mine"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id", equalTo(1)))
                .andExpect(jsonPath("$.data[0].solutionId", equalTo(1)))
                .andExpect(jsonPath("$.data[0].content", equalTo("댓글 내용")))
                .andExpect(jsonPath("$.data[0].createdAt").exists())
                .andExpect(jsonPath("$.data[0].solutionTitle", equalTo("솔루션 제목")));
    }

    @Test
    @DisplayName("댓글을 추가한다.")
    void addComment() throws Exception {
        Member member = MemberTestData.defaultMember().withId(1L).build();
        MemberResponse memberResponse = MemberResponse.from(member);
        CreateSolutionCommentResponse response = new CreateSolutionCommentResponse(
                1L,
                1L,
                null,
                "content",
                memberResponse,
                LocalDateTime.now()
        );
        BDDMockito.given(solutionCommentWriteService.addComment(any(), any(), any()))
                .willReturn(response);

        SolutionCommentRequest request = new SolutionCommentRequest("content", null);
        mockMvc.perform(
                        post("/solutions/1/comments")
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
        UpdateSolutionCommentRequest request = new UpdateSolutionCommentRequest("updated content");
        UpdateSolutionCommentResponse response = new UpdateSolutionCommentResponse(
                1L,
                1L,
                "updated content",
                memberResponse,
                LocalDateTime.now()
        );

        BDDMockito.given(solutionCommentWriteService.updateComment(any(), any(), any()))
                .willReturn(response);

        mockMvc.perform(
                        patch("/solutions/comments/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id", equalTo(1)))
                .andExpect(jsonPath("$.data.solutionId", equalTo(1)))
                .andExpect(jsonPath("$.data.member.id", equalTo(1)))
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andExpect(jsonPath("$.data.content", equalTo("updated content")));
    }

    @Test
    @DisplayName("댓글을 삭제한다.")
    void deleteComment() throws Exception {
        BDDMockito.doNothing()
                .when(solutionCommentWriteService)
                .deleteComment(any(), any());

        mockMvc.perform(
                        delete("/solutions/comments/1")
                                .cookie(new Cookie("token", "mock_token"))
                )
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    private SolutionCommentRepliesResponse createRootCommentResponse(List<SolutionReplyResponse> replyResponses) {
        return new SolutionCommentRepliesResponse(
                1L,
                1L,
                "content",
                MemberResponse.from(MemberTestData.defaultMember().withId(1L).build()),
                replyResponses,
                LocalDateTime.now(),
                false
        );
    }

    private SolutionReplyResponse createReplyResponse() {
        return new SolutionReplyResponse(
                2L,
                1L,
                1L,
                "reply",
                MemberResponse.from(MemberTestData.defaultMember().withId(1L).build()),
                LocalDateTime.now()
        );
    }
}
