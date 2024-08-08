package develup.api;

import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.solution.SolutionRequest;
import develup.application.solution.SolutionResponse;
import develup.application.solution.SolutionService;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionSummary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "솔루션 API")
public class SolutionApi {

    private final SolutionService solutionService;

    public SolutionApi(SolutionService solutionService) {
        this.solutionService = solutionService;
    }

    @PostMapping("/solutions/start")
    @Operation(summary = "미션 시작 API", description = "미션을 시작합니다.")
    public ResponseEntity<ApiResponse<Solution>> startSolution(
            @RequestBody StartSolutionRequest request,
            @Auth Accessor accessor
    ) {
        Solution solution = solutionService.startMission(accessor.id(), request.missionId());

        return ResponseEntity.ok(new ApiResponse<>(solution));
    }

    @GetMapping("/solutions")
    @Operation(summary = "솔루션 조회 목록 API", description = "솔루션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SolutionSummary>>> getSolutions() {
        List<SolutionSummary> summaries = solutionService.getCompletedSummaries();

        return ResponseEntity.ok(new ApiResponse<>(summaries));
    }

    @GetMapping("/solutions/{id}")
    @Operation(summary = "솔루션 조회 API", description = "솔루션을 조회합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> getSolution(@PathVariable Long id) {
        SolutionResponse solutionResponse = solutionService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(solutionResponse));
    }

    @PostMapping("/solutions/submit")
    @Operation(summary = "솔루션 제출 API", description = "솔루션을 제출합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> createSolution(
            @Auth Accessor accessor, //TODO: Accessor 지우기
            @RequestBody SolutionRequest request
    ) {
        SolutionResponse response = solutionService.create(accessor, request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
