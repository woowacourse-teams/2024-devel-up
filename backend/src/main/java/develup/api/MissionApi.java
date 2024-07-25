package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
class MissionApi {

    private final MissionService missionService;

    public MissionApi(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/missions")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getMissions() {
        return ResponseEntity.ok(new ApiResponse<>(missionService.getMissions()));
    }

    @GetMapping("/missions/{missionId}")
    public ResponseEntity<ApiResponse<MissionResponse>> getMission(
            @Auth(required = false) Accessor accessor,
            @PathVariable Long missionId
    ) {
        MissionResponse response = missionService.getMissionById(accessor, missionId);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
