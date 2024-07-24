package develup.application.submission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.submission.PairStatus;
import develup.domain.submission.SubmissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;

class SubmissionServiceTest extends IntegrationTestSupport {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("미션을 제출한다.")
    void createSubmission() {
        Member member = createMember();
        Mission mission = createMission();
        CreateSubmissionRequest request = new CreateSubmissionRequest(mission.getId(), "pr url", "코멘트");

        submissionService.submit(member, request);

        assertThat(submissionRepository.findAll()).hasSize(1);
    }

    @Test
    @DisplayName("존재하지 않는 미션을 제출할 수 없다.")
    void notFoundMission() {
        Member member = createMember();
        CreateSubmissionRequest request = new CreateSubmissionRequest(-1L, "pr url", "코멘트");

        assertThatThrownBy(() -> submissionService.submit(member, request))
                .isInstanceOf(DevelupException.class);
    }

    private Mission createMission() {
        Mission mission = MissionTestData.defaultMission().build();

        return missionRepository.save(mission);
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }

    @Nested
    @Sql(value = {"classpath:mymissions.sql"})
    @DisplayName("특정 유저 미션 현황 서비스 테스트")
    class MyMissionTest {

        @Test
        @DisplayName("참여한 모든 미션을 조회한다.")
        void getMyMissions() {
            Member member = MemberTestData.defaultMember()
                    .withId(1L)
                    .build();

            List<MyMissionResponse> myMissions = submissionService.getMyMissions(member);

            assertThat(myMissions).hasSize(3);
        }

        @Test
        @DisplayName("매칭된 제출이 없는 경우 `매칭 대기` 상태로 설정된다.")
        void getMyMissionsWhenNoPair() {
            Member member = MemberTestData.defaultMember()
                    .withId(1L)
                    .build();

            List<MyMissionResponse> myMissions = submissionService.getMyMissions(member);

            assertThat(myMissions.getFirst().status()).isEqualTo("매칭 대기");
        }

        @Test
        @DisplayName("진행 중인 미션이 있는 경우 해당 미션 한 개를 반환한다.")
        void getMyMission() {
            Member member = MemberTestData.defaultMember()
                    .withId(1L)
                    .build();

            MyMissionResponse response = submissionService.getMyMission(member);

            assertThat(response.status()).isEqualTo(PairStatus.WAITING.getDescription());
        }

        @Test
        @DisplayName("진행 중인 미션이 없는 경우 null을 반환한다.")
        void getMyMissionWhenAllFinished() {
            Member member = MemberTestData.defaultMember()
                    .withId(3L)
                    .build();

            MyMissionResponse response = submissionService.getMyMission(member);

            assertThat(response).isNull();
        }
    }
}
