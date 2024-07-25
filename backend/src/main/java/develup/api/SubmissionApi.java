package develup.api;

import java.net.URI;
import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.submission.CreateSubmissionRequest;
import develup.application.submission.MyMissionResponse;
import develup.application.submission.SubmissionResponse;
import develup.application.submission.SubmissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "제출 API")
class SubmissionApi {

    private final SubmissionService submissionService;

    public SubmissionApi(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @GetMapping("/submissions")
    @Operation(summary = "내 제출 목록 조회 API", description = "내 제출 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<MyMissionResponse>>> getMyMissions(@Auth Accessor accessor) {
        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMissions(accessor.id())));
    }

    @PostMapping("/submissions")
    @Operation(summary = "미션 제출 API", description = "미션을 제출합니다.")
    public ResponseEntity<ApiResponse<SubmissionResponse>> postSubmission(
            @Auth Accessor accessor,
            @RequestBody CreateSubmissionRequest request
    ) {
        SubmissionResponse response = submissionService.submit(accessor.id(), request);

        return ResponseEntity.created(URI.create("/submissions/" + response.id()))
                .body(new ApiResponse<>(response));
    }

    @GetMapping("/submissions/now")
    @Operation(summary = "최근 진행 중인 미션 단건 조회 API", description = "최근 진행 중인 미션을 단건 조회합니다.")
    public ResponseEntity<ApiResponse<MyMissionResponse>> getMyMission(@Auth Accessor accessor) {
        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMission(accessor.id())));
    }
}
