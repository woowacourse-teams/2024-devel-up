package develup.api;

import java.util.List;
import develup.api.common.ApiResponse;
import develup.application.discussion.DiscussionService;
import develup.application.discussion.SummarizedDiscussionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
            @RequestParam(defaultValue = "all") String missionTitle,
            @RequestParam(defaultValue = "all") String hashTag
    ) {
        List<SummarizedDiscussionResponse> responses = discussionService.getSummaries(missionTitle, hashTag);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }
}
