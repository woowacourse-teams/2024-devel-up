package develup.api;

import java.util.List;
import develup.api.common.ApiResponse;
import develup.application.solution.SolutionService;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionSummary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
class SolutionApi {

    private final SolutionService solutionService;
    private final SolutionRepository solutionRepository;

    public SolutionApi(SolutionService solutionService, SolutionRepository solutionRepository) {
        this.solutionService = solutionService;
        this.solutionRepository = solutionRepository;
    }

    @GetMapping("/solutions")
    public ResponseEntity<ApiResponse<List<SolutionSummary>>> getSolutions() {
        return ResponseEntity.ok(new ApiResponse<>(solutionRepository.findSummary()));
    }

    @GetMapping("/solutions/{id}")
    public ResponseEntity<ApiResponse<Solution>> getSolution(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(solutionService.getById(id)));
    }
}
