package develup.support.data;

import develup.domain.mission.Mission;

public class MissionTestData {

    public static MissionBuilder defaultMission() {
        return new MissionBuilder()
                .withTitle("루터회관 흡연단속")
                .withThumbnail("https://thumbnail.com/1.png")
                .withUrl("https://github.com/develup/mission");
    }

    public static class MissionBuilder {

        private Long id;
        private String title;
        private String thumbnail;
        private String url;

        public MissionBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public MissionBuilder withTitle(String title) {
            this.title = title;
            return this;
        }

        public MissionBuilder withThumbnail(String thumbnail) {
            this.thumbnail = thumbnail;
            return this;
        }

        public MissionBuilder withUrl(String url) {
            this.url = url;
            return this;
        }

        public Mission build() {
            return new Mission(
                    id,
                    title,
                    thumbnail,
                    url
            );
        }
    }
}
