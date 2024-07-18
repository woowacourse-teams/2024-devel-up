package develup.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import develup.member.Member;
import develup.member.Provider;
import jakarta.annotation.Nullable;

public record SocialProfile(
        Long id,

        String login,

        @JsonProperty("avatar_url")
        String avatarUrl,

        @Nullable
        String email,

        String name
) {

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
