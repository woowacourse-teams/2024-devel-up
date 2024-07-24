package develup.domain.pair;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import develup.domain.submission.MyMission;
import develup.domain.submission.PairRepository;
import develup.domain.submission.Submission;
import develup.domain.submission.SubmissionRepository;
import develup.support.IntegrationTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;

class PairRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private PairRepository pairRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Test
    @Sql(value = {"classpath:mymissions.sql"})
    @DisplayName("특정 Submission의 페어를 찾는다.")
    void findMyMissionBySubmission() {
        Submission submission = submissionRepository.findById(1L).get();

        MyMission myMission = pairRepository.findMyMissionBySubmission(submission).get();

        assertAll(
                () -> assertThat(myMission.getId()).isEqualTo(1L),
                () -> assertThat(myMission.getStatusDescription()).isEqualTo("완료")
        );
    }
}
