package develup.api;

import java.net.URI;
import java.util.List;
import develup.api.common.ApiResponse;
import develup.application.submission.CreateSubmissionRequest;
import develup.application.submission.MyMissionResponse;
import develup.application.submission.SubmissionResponse;
import develup.application.submission.SubmissionService;
import develup.domain.member.Member;
import develup.domain.member.Provider;
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
    public ResponseEntity<ApiResponse<List<MyMissionResponse>>> getMyMissions() {
        Member member = new Member(1L, "email", Provider.GITHUB, 1234L, "name", "image");

        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMissions(member)));
    }

    @PostMapping("/submissions")
    public ResponseEntity<ApiResponse<SubmissionResponse>> postSubmission(@RequestBody CreateSubmissionRequest request) {
        Member member = new Member(1L, "email", Provider.GITHUB, 1234L, "name", "image");
        SubmissionResponse response = submissionService.submit(member, request);

        return ResponseEntity.created(URI.create("/submissions/" + response.id()))
                .body(new ApiResponse<>(response));
    }

    @GetMapping("/submissions/now")
    public ResponseEntity<ApiResponse<MyMissionResponse>> getMyMission() {
        Member member = new Member(1L, "email", Provider.GITHUB, 1234L, "name", "image");

        return ResponseEntity.ok(new ApiResponse<>(submissionService.getMyMission(member)));
    }
}