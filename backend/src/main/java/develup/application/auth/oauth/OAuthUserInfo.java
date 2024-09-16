package develup.application.auth.oauth;

import develup.domain.member.Member;
import develup.domain.member.OAuthProvider;
import jakarta.annotation.Nullable;

public record OAuthUserInfo(
        Long id,
        String login,
        String avatarUrl,
        @Nullable String email,
        String name
) {

    public OAuthUserInfo {
        if (name == null || name.isBlank()) {
            name = login;
        }
    }

    public Member toMember(OAuthProvider provider) {
        return new Member(
                email,
                provider,
                id,
                name,
                avatarUrl
        );
    }
}
