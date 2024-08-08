package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.solution.SolutionService;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionSummary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "솔루션 API")
public class SolutionApi {

    private final SolutionService solutionService;
    private final SolutionRepository solutionRepository;

    public SolutionApi(SolutionService solutionService, SolutionRepository solutionRepository) {
        this.solutionService = solutionService;
        this.solutionRepository = solutionRepository;
    }

    @PostMapping("/solutions/{missionId}/start")
    @Operation(summary = "미션 시작 API", description = "미션을 시작합니다.")
    public ResponseEntity<ApiResponse<Solution>> startSolution(
            @PathVariable Long missionId,
            @Auth Accessor accessor
    ) {
        Solution solution = solutionService.startMission(accessor.id(), missionId);

        return ResponseEntity.ok(new ApiResponse<>(solution));
    }

    @GetMapping("/solutions")
    @Operation(summary = "솔루션 조회 목록 API", description = "솔루션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SolutionSummary>>> getSolutions() {
        List<SolutionSummary> summaries = solutionRepository.findCompletedSummaries();

        return ResponseEntity.ok(new ApiResponse<>(summaries));
    }

    @GetMapping("/solutions/{id}")
    @Operation(summary = "솔루션 조회 API", description = "솔루션을 조회합니다.")
    public ResponseEntity<ApiResponse<Solution>> getSolution(@PathVariable Long id) {
        Solution solution = solutionService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(solution));
    }
}
