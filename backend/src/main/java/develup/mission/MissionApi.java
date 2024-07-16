package develup.mission;

import develup.support.ApiResponse;
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
    public ResponseEntity<ApiResponse> getMissions() {
        return ResponseEntity.ok(new ApiResponse(missionService.getMissions()));
    }

    @GetMapping("/missions/{id}")
    public ResponseEntity<ApiResponse> getMission(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(missionService.getMissionById(id)));
    }
}
