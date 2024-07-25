package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "미션 API")
class MissionApi {

    private final MissionService missionService;

    public MissionApi(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/missions")
    @Operation(summary = "미션 목록 조회 API", description = "미션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getMissions() {
        return ResponseEntity.ok(new ApiResponse<>(missionService.getMissions()));
    }

    @GetMapping("/missions/{missionId}")
    @Operation(summary = "미션 단건 조회 API", description = "미션 단건을 조회합니다. (제출된 미션 여부를 포함)")
    public ResponseEntity<ApiResponse<MissionResponse>> getMission(
            @Auth(required = false) Accessor accessor,
            @PathVariable Long missionId
    ) {
        MissionResponse response = missionService.getMissionById(accessor, missionId);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
