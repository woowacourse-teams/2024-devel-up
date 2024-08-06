package develup.api;

import java.util.List;
import develup.api.common.ApiResponse;
import develup.application.mission.MissionResponse;
import develup.application.mission.MissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MissionApi {

    private final MissionService missionService;

    public MissionApi(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/missions")
    public ResponseEntity<ApiResponse<List<MissionResponse>>> getMissions() {
        List<MissionResponse> missions = missionService.getMissions();

        return ResponseEntity.ok(new ApiResponse<>(missions));
    }
}
