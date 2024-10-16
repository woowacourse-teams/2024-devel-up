package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.api.common.PageResponse;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
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
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    public ResponseEntity<?> getDiscussions(
            @RequestParam(defaultValue = "all") String mission,
            @RequestParam(defaultValue = "all") String hashTag,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Integer page
    ) {
        if (size == null && page == null) {
            List<SummarizedDiscussionResponse> response = discussionReadService.getSummaries(mission, hashTag);
            return ResponseEntity.ok(new ApiResponse<>(response));
        }

        if (size == null || page == null) {
            throw new DevelupException(ExceptionType.INVALID_PAGE_REQUEST);
        }

        PageResponse<List<SummarizedDiscussionResponse>> response = discussionReadService
                .getSummaries(mission, hashTag, size, page);
        return ResponseEntity.ok(response);
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

    @DeleteMapping("/discussions/{discussionId}")
    @Operation(summary = "디스커션 삭제 API", description = "디스커션을 삭제합니다.")
    public ResponseEntity<ApiResponse<Void>> deleteSolution(
            @Auth Accessor accessor,
            @PathVariable Long discussionId
    ) {
        discussionWriteService.delete(accessor.id(), discussionId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/discussions/mine")
    @Operation(summary = "나의 디스커션 목록 조회 API", description = "내가 작성한 디스커션 목록을 조회합니다.")
    public ResponseEntity<?> getMyDiscussions(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @Auth Accessor accessor
    ) throws MissingServletRequestParameterException {
        // TODO : 하위호환
        if (isBothNull(page, size)) {
            List<SummarizedDiscussionResponse> response = discussionReadService.getDiscussionsByMemberId(accessor.id());
            return ResponseEntity.ok(new ApiResponse<>(response));
        }

        requireNonNull(page, size);

        PageResponse<List<SummarizedDiscussionResponse>> response =
                discussionReadService.getDiscussionsByMemberId(accessor.id(), page, size);
        return ResponseEntity.ok(response);
    }

    private boolean isBothNull(Integer page, Integer size) {
        return page == null && size == null;
    }

    private void requireNonNull(Integer page, Integer size) throws MissingServletRequestParameterException {
        if (page == null) {
            throw new MissingServletRequestParameterException("page", "number");
        }

        if (size == null) {
            throw new MissingServletRequestParameterException("size", "number");
        }
    }
}
