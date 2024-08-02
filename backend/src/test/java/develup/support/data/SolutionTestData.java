package develup.support.data;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionStatus;

public class SolutionTestData {

    public static SolutionBuilder defaultSolution() {
        return new SolutionBuilder()
                .withMember(MemberTestData.defaultMember().build())
                .withMission(MissionTestData.defaultMission().build())
                .withTitle("루터회관 흡연단속 제출합니다.")
                .withDescription("안녕하세요. 피드백 잘 부탁 드려요.")
                .withUrl("https://github.com/develup/mission/pull/1")
                .withStatus(SolutionStatus.COMPLETED);
    }

    public static class SolutionBuilder {

        private Long id;
        private Mission mission;
        private Member member;
        private String title;
        private String description;
        private String url;
        private SolutionStatus status;

        public SolutionBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public SolutionBuilder withMission(Mission mission) {
            this.mission = mission;
            return this;
        }

        public SolutionBuilder withMember(Member member) {
            this.member = member;
            return this;
        }

        public SolutionBuilder withTitle(String title) {
            this.title = title;
            return this;
        }

        public SolutionBuilder withDescription(String description) {
            this.description = description;
            return this;
        }


        public SolutionBuilder withUrl(String url) {
            this.url = url;
            return this;
        }

        public SolutionBuilder withStatus(SolutionStatus status) {
            this.status = status;
            return this;
        }

        public Solution build() {
            return new Solution(
                    id,
                    mission,
                    member,
                    title,
                    description,
                    url,
                    status
            );
        }
    }
}
