package develup.application.auth;

import develup.domain.member.Member;
import develup.domain.member.Provider;
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

    public Member toMember(Provider provider) {
        return new Member(
                email,
                provider,
                id,
                name,
                avatarUrl
        );
    }
}
