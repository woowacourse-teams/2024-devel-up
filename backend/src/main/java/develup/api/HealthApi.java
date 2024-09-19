package develup.api;

import develup.api.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthApi {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {

        return ResponseEntity.status(400).body(new ApiResponse<>("up"));
    }
}
