package develup.api;

import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "회원 API")
public class MemberApi {

    private final MemberService memberService;

    public MemberApi(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/member/mine")
    @Operation(summary = "내 정보 조회 API", description = "'token' 쿠키를 이용해서 내 정보를 조회합니다.")
    public ResponseEntity<ApiResponse<MemberResponse>> getMyInfo(@Auth Accessor accessor) {
        MemberResponse response = memberService.getMemberById(accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
