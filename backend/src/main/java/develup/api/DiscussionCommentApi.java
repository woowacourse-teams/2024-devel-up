package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.discussion.comment.DiscussionCommentCreateRequest;
import develup.application.discussion.comment.DiscussionCommentResponse;
import develup.application.discussion.comment.DiscussionCommentService;
import develup.application.discussion.comment.GroupingDiscussionCommentResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "디스커션 댓글 API")
public class DiscussionCommentApi {

    private final DiscussionCommentService discussionCommentService;

    public DiscussionCommentApi(DiscussionCommentService discussionCommentService) {
        this.discussionCommentService = discussionCommentService;
    }

    @GetMapping("/discussions/{discussionId}/comments")
    public ResponseEntity<ApiResponse<List<GroupingDiscussionCommentResponse>>> getGroupedComments(@PathVariable Long discussionId) {
        var responses = discussionCommentService.getGroupingComments(discussionId);
        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @PostMapping("/discussions/{discussionId}/comments")
    public ResponseEntity<ApiResponse<DiscussionCommentResponse>> createComment(
            @Auth Accessor accessor,
            @PathVariable Long discussionId,
            @RequestBody DiscussionCommentCreateRequest commentCreateRequest
    ) {
        var response = discussionCommentService.createComment(accessor.id(), discussionId, commentCreateRequest);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
