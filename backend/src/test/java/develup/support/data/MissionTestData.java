package develup.support.data;

import java.util.Collections;
import java.util.List;
import develup.domain.hashtag.HashTag;
import develup.domain.mission.Mission;

public class MissionTestData {

    public static MissionBuilder defaultMission() {
        return new MissionBuilder()
                .withTitle("루터회관 흡연단속")
                .withThumbnail("https://thumbnail.com/1.png")
                .withSummary("담배피다 걸린 행성이를 위한 벌금 계산 미션")
                .withUrl("https://github.com/develup-mission/java-smoking")
                .withHashTags(Collections.emptyList());
    }

    public static class MissionBuilder {

        private Long id;
        private String title;
        private String thumbnail;
        private String summary;
        private String url;
        private List<HashTag> hashTags;

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

        public MissionBuilder withSummary(String summary) {
            this.summary = summary;
            return this;
        }

        public MissionBuilder withUrl(String url) {
            this.url = url;
            return this;
        }

        public MissionBuilder withHashTags(List<HashTag> hashTags) {
            this.hashTags = hashTags;
            return this;
        }

        public Mission build() {
            return new Mission(
                    id,
                    title,
                    thumbnail,
                    summary,
                    url,
                    hashTags
            );
        }
    }
}
