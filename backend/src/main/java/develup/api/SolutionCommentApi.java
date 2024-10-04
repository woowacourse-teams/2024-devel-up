package develup.api;

import java.net.URI;
import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.solution.comment.CreateSolutionCommentResponse;
import develup.application.solution.comment.MySolutionCommentResponse;
import develup.application.solution.comment.SolutionCommentReadService;
import develup.application.solution.comment.SolutionCommentRepliesResponse;
import develup.application.solution.comment.SolutionCommentRequest;
import develup.application.solution.comment.SolutionCommentWriteService;
import develup.application.solution.comment.UpdateSolutionCommentRequest;
import develup.application.solution.comment.UpdateSolutionCommentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "솔루션 댓글 API")
public class SolutionCommentApi {

    private final SolutionCommentWriteService solutionCommentWriteService;
    private final SolutionCommentReadService solutionCommentReadService;

    public SolutionCommentApi(
            SolutionCommentWriteService solutionCommentWriteService,
            SolutionCommentReadService solutionCommentReadService
    ) {
        this.solutionCommentWriteService = solutionCommentWriteService;
        this.solutionCommentReadService = solutionCommentReadService;
    }

    @GetMapping("/solutions/{solutionId}/comments")
    @Operation(summary = "솔루션 댓글 조회 API", description = "솔루션의 댓글 목록을 조회합니다. 댓글들과 댓글들에 대한 답글을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SolutionCommentRepliesResponse>>> getComments(
            @PathVariable Long solutionId
    ) {
        List<SolutionCommentRepliesResponse> responses = solutionCommentReadService.getCommentsWithReplies(solutionId);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/solutions/comments/mine")
    @Operation(summary = "사용자가 솔루션에 단 댓글 조회 API", description = "사용자가 솔루션에 단 댓글 목록을 조회합니다. 댓글 정보와 댓글이 달린 솔루션의 일부 정보를 조회합니다.")
    public ResponseEntity<ApiResponse<List<MySolutionCommentResponse>>> getMyComments(@Auth Accessor accessor) {
        List<MySolutionCommentResponse> responses = solutionCommentReadService.getMyComments(accessor.id());
        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @PostMapping("/solutions/{solutionId}/comments")
    @Operation(summary = "솔루션 댓글 추가 API", description = "솔루션에 댓글을 추가합니다. 부모 댓글 식별자로 답글을 추가할 수 있습니다.")
    public ResponseEntity<ApiResponse<CreateSolutionCommentResponse>> addComment(
            @PathVariable Long solutionId,
            @Valid @RequestBody SolutionCommentRequest request,
            @Auth Accessor accessor
    ) {
        CreateSolutionCommentResponse response = solutionCommentWriteService.addComment(solutionId, request, accessor.id());

        URI location = URI.create("/solutions/" + response.solutionId() + "/comments/" + response.id());

        return ResponseEntity.created(location).body(new ApiResponse<>(response));
    }

    @PatchMapping("/solutions/comments/{commentId}")
    @Operation(summary = "솔루션 댓글 수정 API", description = "솔루션의 댓글을 수정합니다.")
    public ResponseEntity<ApiResponse<UpdateSolutionCommentResponse>> updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody UpdateSolutionCommentRequest request,
            @Auth Accessor accessor
    ) {
        UpdateSolutionCommentResponse response = solutionCommentWriteService.updateComment(commentId, request, accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @DeleteMapping("/solutions/comments/{commentId}")
    @Operation(summary = "솔루션 댓글 삭제 API", description = "솔루션의 댓글을 삭제합니다.")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @Auth Accessor accessor
    ) {
        solutionCommentWriteService.deleteComment(commentId, accessor.id());

        return ResponseEntity.noContent().build();
    }
}
