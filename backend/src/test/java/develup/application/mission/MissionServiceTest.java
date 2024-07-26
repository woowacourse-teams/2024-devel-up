package develup.application.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.application.auth.Accessor;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.submission.Submission;
import develup.domain.submission.SubmissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SubmissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionServiceTest extends IntegrationTestSupport {

    @Autowired
    private MissionService missionService;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Test
    @DisplayName("모든 미션을 조회한다.")
    void getMissions() {
        createMission();
        createMission();

        List<MissionResponse> missions = missionService.getMissions();

        assertThat(missions).hasSize(2);
    }

    @Test
    @DisplayName("로그인하지 않은 사용자가 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenGuest() {
        Mission mission = createMission();

        MissionResponse response = missionService.getMissionById(Accessor.GUEST, mission.getId());

        assertThat(response).isEqualTo(MissionResponse.from(mission));
    }

    @Test
    @DisplayName("로그인한 멤버가 제출하지 않은 미션을 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenNotSubmitted() {
        Mission mission = createMission();
        Member member = createMember();
        Accessor accessor = new Accessor(member.getId());

        MissionResponse response = missionService.getMissionById(accessor, mission.getId());

        assertThat(response).isEqualTo(MissionResponse.from(mission));
    }

    @Test
    @DisplayName("로그인한 멤버가 제출한 미션을 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenSubmitted() {
        Mission mission = createMission();
        Member member = createMember();
        Submission submission = createSubmission(mission, member);
        Accessor accessor = new Accessor(member.getId());

        MissionResponse response = missionService.getMissionById(accessor, mission.getId());

        assertThat(response).isEqualTo(MissionResponse.of(mission, true, submission.getUrl()));
    }

    @Test
    @DisplayName("존재하지 않는 미션 식별자로 미션 조회시 예외가 발생한다.")
    void getMissionByUndefinedId() {
        assertThatThrownBy(() -> missionService.getMissionById(Accessor.GUEST, -1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }

    private Mission createMission() {
        Mission mission = MissionTestData.defaultMission().build();

        return missionRepository.save(mission);
    }

    private Submission createSubmission(Mission mission, Member member) {
        Submission submission = SubmissionTestData.defaultSubmission()
                .withMember(member)
                .withMission(mission)
                .build();

        return submissionRepository.save(submission);
    }
}
