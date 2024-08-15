package develup.support.data;

import develup.domain.hashtag.HashTag;

public class HashTagTestData {

    public static HashTagBuilder defaultHashTag() {
        return new HashTagBuilder().withName("JAVA");
    }

    public static class HashTagBuilder {

        private Long id;
        private String name;

        public HashTagBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public HashTagBuilder withName(String name) {
            this.name = name;
            return this;
        }

        public HashTag build() {
            return new HashTag(id, name);
        }
    }
}
