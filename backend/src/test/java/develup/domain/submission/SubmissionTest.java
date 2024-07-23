package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;

import develup.domain.member.Member;
import develup.domain.member.Provider;
import develup.domain.mission.Language;
import develup.domain.mission.Mission;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SubmissionTest {

    @Test
    @DisplayName("같은 사용자의 제출이 아닌지 확인할 수 있다.")
    void isNotSameOwner() {
        Member member1 = createMember(1L);
        Member member2 = createMember(2L);
        Mission mission = createMission();
        Submission submission1 = createSubmission(member1, mission);
        Submission submission2 = createSubmission(member2, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("같은 사용자의 제출인지 확인할 수 있다.")
    void isSameOwner() {
        Member member = createMember(1L);
        Mission mission = createMission();
        Submission submission2 = createSubmission(member, mission);
        Submission submission1 = createSubmission(member, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isFalse();
    }

    private Member createMember(Long id) {
        return new Member(id, "email", Provider.GITHUB, 1234L, "name", "image");
    }

    private Mission createMission() {
        return new Mission("title", Language.JAVA, "description", "thumbnail", "url");
    }

    private Submission createSubmission(Member member1, Mission mission) {
        return new Submission("url", "comment", member1, mission);
    }
}
