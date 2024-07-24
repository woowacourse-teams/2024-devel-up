package develup.api;

import develup.api.auth.Auth;
import develup.api.common.ApiResponse;
import develup.application.auth.Accessor;
import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberApi {

    private final MemberService memberService;

    public MemberApi(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/member/mine")
    public ResponseEntity<ApiResponse<MemberResponse>> getMyInfo(@Auth Accessor accessor) {
        MemberResponse response = memberService.getMemberById(accessor.id());

        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
