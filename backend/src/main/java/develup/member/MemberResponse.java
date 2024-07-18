package develup.member;

public record MemberResponse(Long id, String email, String name, String imageUrl) {

    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getImageUrl()
        );
    }
}
