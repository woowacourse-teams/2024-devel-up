package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.discussion.CreateDiscussionRequest;
import develup.application.discussion.DiscussionResponse;
import develup.application.discussion.DiscussionService;
import develup.application.discussion.SummarizedDiscussionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "디스커션 API")
public class DiscussionApi {

    private final DiscussionService discussionService;

    public DiscussionApi(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping("/discussions")
    @Operation(summary = "디스커션 목록 조회 API", description = "디스커션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SummarizedDiscussionResponse>>> getDiscussions(
            @RequestParam(defaultValue = "all") String mission,
            @RequestParam(defaultValue = "all") String hashTag
    ) {
        List<SummarizedDiscussionResponse> responses = discussionService.getSummaries(mission, hashTag);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @PostMapping("/discussions/submit")
    @Operation(summary = "디스커션 제출 API", description = "디스커션을 제출합니다.")
    public ResponseEntity<ApiResponse<DiscussionResponse>> createDiscussion(
            @Auth Accessor accessor,
            @Valid @RequestBody CreateDiscussionRequest request
    ) {
        DiscussionResponse response = discussionService.create(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
