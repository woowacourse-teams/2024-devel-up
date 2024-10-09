package develup.application.member;

import develup.domain.member.Member;

public record MemberResponse(Long id, String email, String name, String imageUrl) {

    // TODO : 이메일 불필요할때는 응답 안하기
    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getImageUrl()
        );
    }
}
