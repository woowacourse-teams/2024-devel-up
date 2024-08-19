package develup.api;

import java.util.List;
import develup.api.common.ApiResponse;
import develup.application.hashtag.HashTagResponse;
import develup.application.hashtag.HashTagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "해시태그 API")
class HashTagApi {

    private final HashTagService hashTagService;

    public HashTagApi(HashTagService hashTagService) {
        this.hashTagService = hashTagService;
    }

    @GetMapping("/hash-tags")
    @Operation(summary = "해시태그 목록 조회 API", description = "해시태그 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<HashTagResponse>>> getHashTags() {
        List<HashTagResponse> responses = hashTagService.getHashTags();

        return ResponseEntity.ok(new ApiResponse<>(responses));
    }
}
