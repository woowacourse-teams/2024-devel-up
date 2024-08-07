package develup.api;

import java.util.List;
import develup.api.common.ApiResponse;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionSummary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class SolutionApi {

    private final SolutionRepository solutionRepository;

    public SolutionApi(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    @GetMapping("/solutions")
    public ResponseEntity<ApiResponse<List<SolutionSummary>>> getSolutions() {
        return ResponseEntity.ok(new ApiResponse<>(solutionRepository.findSummary()));
    }
}
