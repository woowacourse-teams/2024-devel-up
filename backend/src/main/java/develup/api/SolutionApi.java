package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.solution.MySolutionResponse;
import develup.application.solution.SolutionResponse;
import develup.application.solution.SolutionService;
import develup.application.solution.StartSolutionRequest;
import develup.application.solution.SubmitSolutionRequest;
import develup.application.solution.SummarizedSolutionResponse;
import develup.application.solution.UpdateSolutionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<ApiResponse<SolutionResponse>> startMission(
            @Valid @RequestBody StartSolutionRequest request,
            @Auth Accessor accessor
    ) {
        SolutionResponse response = solutionService.startMission(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @PostMapping("/solutions/submit")
    @Operation(summary = "솔루션 제출 API", description = "솔루션을 제출합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> submitSolution(
            @Auth Accessor accessor,
            @Valid @RequestBody SubmitSolutionRequest request
    ) {
        SolutionResponse response = solutionService.submit(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @PatchMapping("/solutions")
    @Operation(summary = "솔루션 수정 API", description = "솔루션을 수정합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> updateSolution(
            @Auth Accessor accessor,
            @Valid @RequestBody UpdateSolutionRequest request
    ) {
        SolutionResponse response = solutionService.update(accessor.id(), request);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @DeleteMapping("/solutions/{solutionId}")
    @Operation(summary = "솔루션 삭제 API", description = "솔루션을 삭제합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> deleteSolution(
            @Auth Accessor accessor,
            @PathVariable Long solutionId
    ) {
        solutionService.delete(accessor.id(), solutionId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/solutions")
    @Operation(summary = "솔루션 목록 조회 API", description = "솔루션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<SummarizedSolutionResponse>>> getSolutions(
            @RequestParam(defaultValue = "all") String hashTag
    ) {
        List<SummarizedSolutionResponse> responses = solutionService.getCompletedSummaries(hashTag);

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/solutions/{id}")
    @Operation(summary = "솔루션 조회 API", description = "솔루션을 조회합니다.")
    public ResponseEntity<ApiResponse<SolutionResponse>> getSolution(@PathVariable Long id) {
        SolutionResponse response = solutionService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    @GetMapping("/solutions/mine")
    @Operation(summary = "나의 솔루션 목록 조회 API", description = "내가 제출한 솔루션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<MySolutionResponse>>> getMySolutions(@Auth Accessor accessor) {
        List<MySolutionResponse> response = solutionService.getSubmittedSolutionsByMemberId(accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
