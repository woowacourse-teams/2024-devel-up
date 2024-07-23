package develup.support;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.submission.Submission;

public class SubmissionTestData {

    public static SubmissionBuilder defaultSubmission() {
        return new SubmissionBuilder()
                .withUrl("github.com/develup/pull/1")
                .withComment("리뷰 감사합니다.")
                .withMember(MemberTestData.defaultMember().build())
                .withMission(MissionTestData.defaultMission().build());
    }

    public static class SubmissionBuilder {

        private Long id;
        private String url;
        private String comment;
        private Member member;
        private Mission mission;

        public SubmissionBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public SubmissionBuilder withUrl(String url) {
            this.url = url;
            return this;
        }

        public SubmissionBuilder withComment(String comment) {
            this.comment = comment;
            return this;
        }

        public SubmissionBuilder withMember(Member member) {
            this.member = member;
            return this;
        }

        public SubmissionBuilder withMission(Mission mission) {
            this.mission = mission;
            return this;
        }

        public Submission build() {
            return new Submission(
                    id,
                    url,
                    comment,
                    member,
                    mission
            );
        }
    }
}
