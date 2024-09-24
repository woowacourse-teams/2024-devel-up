package develup.support.data;

import develup.domain.member.Member;
import develup.domain.member.OAuthProvider;

public class MemberTestData {

    public static MemberBuilder defaultMember() {
        return new MemberBuilder()
                .withEmail("email@email.com")
                .withProvider(OAuthProvider.GITHUB)
                .withSocialId(1234L)
                .withName("tester")
                .withImageUrl("image.com/1.jpg");
    }

    public static class MemberBuilder {

        private Long id;
        private String email;
        private OAuthProvider provider;
        private Long socialId;
        private String name;
        private String imageUrl;

        public MemberBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public MemberBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public MemberBuilder withProvider(OAuthProvider provider) {
            this.provider = provider;
            return this;
        }

        public MemberBuilder withSocialId(Long socialId) {
            this.socialId = socialId;
            return this;
        }

        public MemberBuilder withName(String name) {
            this.name = name;
            return this;
        }

        public MemberBuilder withImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Member build() {
            return new Member(
                    id,
                    email,
                    provider,
                    socialId,
                    name,
                    imageUrl
            );
        }
    }
}
