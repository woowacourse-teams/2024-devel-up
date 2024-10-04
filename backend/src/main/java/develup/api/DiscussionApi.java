package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.discussion.CreateDiscussionRequest;
import develup.application.discussion.DiscussionReadService;
import develup.application.discussion.DiscussionResponse;
import develup.application.discussion.DiscussionWriteService;
import develup.application.discussion.SummarizedDiscussionResponse;
import develup.application.discussion.UpdateDiscussionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Tag(name = "디스커션 API")
public class DiscussionApi {

    private final DiscussionWriteService discussionWriteService;
    private final DiscussionReadService discussionReadService;

    @GetMapping("/discussions")
    @Operation(summary = "디스커션 목록 조회 API", description = "디스커션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SummarizedDiscussionResponse>>> getDiscussions(
            @RequestParam(defaultValue = "all") String mission,
            @RequestParam(defaultValue = "all") String hashTag
    ) {
        List<SummarizedDiscussionResponse> responses = discussionReadService.getSummaries(mission, hashTag);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/discussions/{id}")
    @Operation(summary = "디스커션 조회 API", description = "디스커션을 조회합니다.")
    public ResponseEntity<ApiResponse<DiscussionResponse>> getDiscussion(@PathVariable Long id) {
        DiscussionResponse response = discussionReadService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @PostMapping("/discussions/submit")
    @Operation(summary = "디스커션 제출 API", description = "디스커션을 제출합니다.")
    public ResponseEntity<ApiResponse<DiscussionResponse>> createDiscussion(
            @Auth Accessor accessor,
            @Valid @RequestBody CreateDiscussionRequest request
    ) {
        DiscussionResponse response = discussionWriteService.create(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @PatchMapping("/discussions")
    @Operation(summary = "디스커션 수정 API", description = "디스커션을 수정합니다.")
    public ResponseEntity<ApiResponse<DiscussionResponse>> updateDiscussion(
            @Auth Accessor accessor,
            @Valid @RequestBody UpdateDiscussionRequest request
    ) {
        DiscussionResponse response = discussionWriteService.update(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @GetMapping("/discussions/mine")
    @Operation(summary = "나의 디스커션 목록 조회 API", description = "내가 작성한 디스커션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SummarizedDiscussionResponse>>> getMyDiscussions(@Auth Accessor accessor) {
        List<SummarizedDiscussionResponse> response = discussionReadService.getDiscussionsByMemberId(accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
