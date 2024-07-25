package develup.application.submission;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.submission.MyMission;
import develup.domain.submission.PairRepository;
import develup.domain.submission.Submission;
import develup.domain.submission.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubmissionService {

    private final MissionRepository missionRepository;
    private final SubmissionRepository submissionRepository;
    private final MemberRepository memberRepository;
    private final PairRepository pairRepository;
    private final PairService pairService;

    public SubmissionService(
            MissionRepository missionRepository,
            SubmissionRepository submissionRepository,
            MemberRepository memberRepository,
            PairRepository pairRepository,
            PairService pairService
    ) {
        this.missionRepository = missionRepository;
        this.submissionRepository = submissionRepository;
        this.memberRepository = memberRepository;
        this.pairRepository = pairRepository;
        this.pairService = pairService;
    }

    public SubmissionResponse submit(Long memberId, CreateSubmissionRequest request) {
        Mission mission = missionRepository.findById(request.missionId())
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));

        Submission newSubmission = submissionRepository.save(request.toSubmission(member, mission));
        tryMatch(newSubmission);

        return SubmissionResponse.from(newSubmission);
    }

    private void tryMatch(Submission newSubmission) {
        if (pairService.canMatch(newSubmission)) {
            pairService.match(newSubmission);
        }
    }

    public List<MyMissionResponse> getMyMissions(Long memberId) {
        List<Submission> submissions = submissionRepository.findAllByMember_IdOrderByIdDesc(memberId);

        return submissions.stream()
                .map(this::findMyMission)
                .map(MyMissionResponse::from)
                .toList();
    }

    public MyMissionResponse getMyMission(Long memberId) {
        return submissionRepository.findFirstByMember_IdOrderByIdDesc(memberId)
                .map(this::findMyMission)
                .filter(MyMission::isNotFinished)
                .map(MyMissionResponse::from)
                .orElse(null);
    }

    private MyMission findMyMission(Submission submission) {
        return pairRepository.findMyMissionBySubmission(submission)
                .orElseGet(() -> MyMission.waitPairMatching(submission));
    }
}
