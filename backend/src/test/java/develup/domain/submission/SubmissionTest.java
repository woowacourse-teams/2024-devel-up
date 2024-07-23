package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.support.MemberTestData;
import develup.support.MissionTestData;
import develup.support.SubmissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SubmissionTest {

    @Test
    @DisplayName("같은 사용자의 제출이 아닌지 확인할 수 있다.")
    void isNotSameOwner() {
        Mission mission = MissionTestData.defaultMission().build();
        Member member1 = createMember(1L);
        Member member2 = createMember(2L);
        Submission submission1 = createSubmission(member1, mission);
        Submission submission2 = createSubmission(member2, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("같은 사용자의 제출인지 확인할 수 있다.")
    void isSameOwner() {
        Mission mission = MissionTestData.defaultMission().build();
        Member member = createMember(1L);
        Submission submission2 = createSubmission(member, mission);
        Submission submission1 = createSubmission(member, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isFalse();
    }

    private Member createMember(Long id) {
        return MemberTestData.defaultMember()
                .withId(id)
                .build();
    }

    private Submission createSubmission(Member member, Mission mission) {
        return SubmissionTestData.defaultSubmission()
                .withMember(member)
                .withMission(mission)
                .build();
    }
}
