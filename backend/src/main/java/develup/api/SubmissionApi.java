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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class SubmissionApi {

    private final SubmissionService submissionService;

    public SubmissionApi(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @GetMapping("/submissions")
    public ResponseEntity<ApiResponse<List<MyMissionResponse>>> getMyMissions(@Auth Accessor accessor) {
        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMissions(accessor.id())));
    }

    @PostMapping("/submissions")
    public ResponseEntity<ApiResponse<SubmissionResponse>> postSubmission(
            @Auth Accessor accessor,
            @RequestBody CreateSubmissionRequest request
    ) {
        SubmissionResponse response = submissionService.submit(accessor.id(), request);

        return ResponseEntity.created(URI.create("/submissions/" + response.id()))
                .body(new ApiResponse<>(response));
    }

    @GetMapping("/submissions/now")
    public ResponseEntity<ApiResponse<MyMissionResponse>> getMyMission(@Auth Accessor accessor) {
        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMission(accessor.id())));
    }
}
