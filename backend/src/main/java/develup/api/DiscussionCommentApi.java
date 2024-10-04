package develup.api;

import java.net.URI;
import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.discussion.comment.CreateDiscussionCommentResponse;
import develup.application.discussion.comment.DiscussionCommentReadService;
import develup.application.discussion.comment.DiscussionCommentRepliesResponse;
import develup.application.discussion.comment.DiscussionCommentRequest;
import develup.application.discussion.comment.DiscussionCommentWriteService;
import develup.application.discussion.comment.MyDiscussionCommentResponse;
import develup.application.discussion.comment.UpdateDiscussionCommentRequest;
import develup.application.discussion.comment.UpdateDiscussionCommentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Tag(name = "디스커션 댓글 API")
public class DiscussionCommentApi {

    private final DiscussionCommentWriteService discussionCommentWriteService;
    private final DiscussionCommentReadService discussionCommentReadService;

    @GetMapping("/discussions/{discussionId}/comments")
    @Operation(summary = "디스커션 댓글 조회 API", description = "디스커션의 댓글 목록을 조회합니다. 댓글들과 댓글들에 대한 답글을 조회합니다.")
    public ResponseEntity<ApiResponse<List<DiscussionCommentRepliesResponse>>> getComments(
            @PathVariable Long discussionId
    ) {
        List<DiscussionCommentRepliesResponse> responses = discussionCommentReadService.getCommentsWithReplies(discussionId);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/discussions/comments/mine")
    @Operation(summary = "사용자가 디스커션에 단 댓글 조회 API", description = "사용자가 디스커션에 단 댓글 목록을 조회합니다. 댓글 정보와 댓글이 달린 디스커션의 일부 정보를 조회합니다.")
    public ResponseEntity<ApiResponse<List<MyDiscussionCommentResponse>>> getMyComments(@Auth Accessor accessor) {
        List<MyDiscussionCommentResponse> responses = discussionCommentReadService.getMyComments(accessor.id());
        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @PostMapping("/discussions/{discussionId}/comments")
    @Operation(summary = "디스커션 댓글 추가 API", description = "디스커션에 댓글을 추가합니다. 부모 댓글 식별자로 답글을 추가할 수 있습니다.")
    public ResponseEntity<ApiResponse<CreateDiscussionCommentResponse>> addComment(
            @PathVariable Long discussionId,
            @Valid @RequestBody DiscussionCommentRequest request,
            @Auth Accessor accessor
    ) {
        CreateDiscussionCommentResponse response = discussionCommentWriteService.addComment(discussionId, request, accessor.id());

        URI location = URI.create("/discussions/" + response.discussionId() + "/comments/" + response.id());

        return ResponseEntity.created(location).body(new ApiResponse<>(response));
    }

    @PatchMapping("/discussions/comments/{commentId}")
    @Operation(summary = "디스커션 댓글 수정 API", description = "디스커션의 댓글을 수정합니다.")
    public ResponseEntity<ApiResponse<UpdateDiscussionCommentResponse>> updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody UpdateDiscussionCommentRequest request,
            @Auth Accessor accessor
    ) {
        UpdateDiscussionCommentResponse response = discussionCommentWriteService.updateComment(commentId, request, accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @DeleteMapping("/discussions/comments/{commentId}")
    @Operation(summary = "디스커션 댓글 삭제 API", description = "디스커션의 댓글을 삭제합니다.")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @Auth Accessor accessor
    ) {
        discussionCommentWriteService.deleteComment(commentId, accessor.id());

        return ResponseEntity.noContent().build();
    }
}
