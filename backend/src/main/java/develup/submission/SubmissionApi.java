package develup.submission;

import java.net.URI;
import develup.member.Member;
import develup.support.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class SubmissionApi {

    private final SubmissionService submissionService;

    public SubmissionApi(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/submissions")
    public ResponseEntity<ApiResponse<SubmissionResponse>> postSubmission(@RequestBody CreateSubmissionRequest request) {
        Member member = new Member(1L);
        SubmissionResponse response = submissionService.submit(member, request);
        return ResponseEntity.created(URI.create("/submissions/" + response.id()))
                .body(new ApiResponse<>(response));
    }
}
