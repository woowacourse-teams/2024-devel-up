package develup.submission;

import static org.assertj.core.api.Assertions.assertThat;

import develup.member.Member;
import develup.member.Provider;
import develup.mission.Language;
import develup.mission.Mission;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SubmissionTest {

    @Test
    @DisplayName("같은 사용자의 제출이 아닌지 확인할 수 있다.")
    void isNotSameOwner() {
        Member member1 = new Member(1L, "email", Provider.GITHUB, 1234L, "name", "image");
        Member member2 = new Member(2L, "email", Provider.GITHUB, 1234L, "name", "image");
        Mission mission = new Mission("title", Language.JAVA, "description", "thumbnail", "url");
        Submission submission1 = new Submission("url", "comment", member1, mission);
        Submission submission2 = new Submission("url", "comment", member2, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("같은 사용자의 제출인지 확인할 수 있다.")
    void isSameOwner() {
        Member member = new Member(1L, "email", Provider.GITHUB, 1234L, "name", "image");
        Mission mission = new Mission("title", Language.JAVA, "description", "thumbnail", "url");
        Submission submission1 = new Submission("url", "comment", member, mission);
        Submission submission2 = new Submission("url", "comment", member, mission);

        boolean result = submission1.isNotSameOwner(submission2);

        assertThat(result).isFalse();
    }
}
