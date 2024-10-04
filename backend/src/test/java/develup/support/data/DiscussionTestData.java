package develup.support.data;

import java.util.Collections;
import java.util.List;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionTitle;
import develup.domain.hashtag.HashTag;
import develup.domain.member.Member;
import develup.domain.mission.Mission;

public class DiscussionTestData {

    public static DiscussionBuilder defaultDiscussion() {
        return new DiscussionBuilder()
                .withTitle("루터회관 흡연단속 구현에 대한 고찰")
                .withContent("루터회관 흡연단속을 구현하면서 느낀 점을 공유합니다.")
                .withMission(MissionTestData.defaultMission().build())
                .withMember(MemberTestData.defaultMember().build())
                .withHashTags(Collections.emptyList());
    }

    public static class DiscussionBuilder {

        private Long id;
        private DiscussionTitle title;
        private String content;
        private Mission mission;
        private Member member;
        private List<HashTag> hashTags;

        public DiscussionBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public DiscussionBuilder withTitle(String title) {
            this.title = new DiscussionTitle(title);
            return this;
        }

        public DiscussionBuilder withContent(String content) {
            this.content = content;
            return this;
        }

        public DiscussionBuilder withMission(Mission mission) {
            this.mission = mission;
            return this;
        }

        public DiscussionBuilder withMember(Member member) {
            this.member = member;
            return this;
        }

        public DiscussionBuilder withHashTags(List<HashTag> hashTags) {
            this.hashTags = hashTags;
            return this;
        }

        public Discussion build() {
            return new Discussion(
                    id,
                    title,
                    content,
                    mission,
                    member,
                    hashTags
            );
        }
    }
}
