package develup.api;

import java.util.List;
import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import develup.application.mission.MissionWithStartedResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MissionApi {

    private final MissionService missionService;

    public MissionApi(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/missions")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getMissions() {
        List<MissionResponse> responses = missionService.getMissions();

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }

    @GetMapping("/missions/{missionId}")
    public ResponseEntity<ApiResponse<MissionWithStartedResponse>> getMission(
            @PathVariable Long missionId,
            @Auth(required = false) Accessor accessor
    ) {
        MissionWithStartedResponse response = missionService.getMission(accessor, missionId);

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
