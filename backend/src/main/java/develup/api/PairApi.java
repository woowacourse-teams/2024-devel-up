package develup.api;

import develup.api.common.ApiResponse;
import develup.application.submission.MyMissionResponse;
import develup.application.submission.PairService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PairApi {

    private final PairService pairService;

    public PairApi(PairService pairService) {
        this.pairService = pairService;
    }

    @PostMapping("/pair-review/{submissionId}")
    @Operation(summary = "코드리뷰를 완료한다.", description = "코드 리뷰를 완료한 뒤 변경된 페어 매칭 정보를 반환한다.")
    public ResponseEntity<ApiResponse<MyMissionResponse>> review(@PathVariable Long submissionId) {
        return ResponseEntity.ok(new ApiResponse<>(pairService.reviewComplete(submissionId)));
    }
}
