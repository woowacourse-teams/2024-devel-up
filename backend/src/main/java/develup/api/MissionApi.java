package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import develup.application.mission.MissionWithStartedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "미션 API")
public class MissionApi {

    private final MissionService missionService;

    public MissionApi(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/missions")
    @Operation(summary = "미션 목록 조회 API", description = "미션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getMissions() {
        List<MissionResponse> responses = missionService.getMissions();

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/missions/start")
    @Operation(summary = "미션 목록 조회 API", description = "미션 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getInProgressMissions(@Auth Accessor accessor) {
        List<MissionResponse> responses = missionService.getInProgressMissions(accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/missions/{missionId}")
    @Operation(
            summary = "미션 조회 API",
            description = "미션을 조회합니다. 비로그인, 로그인 사용자 중 제출 여부에 따라 시작 상태 응답이 달라집니다."
    )
    public ResponseEntity<ApiResponse<MissionWithStartedResponse>> getMission(
            @PathVariable Long missionId,
            @Auth(required = false) Accessor accessor
    ) {
        MissionWithStartedResponse response = missionService.getMission(accessor, missionId);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
