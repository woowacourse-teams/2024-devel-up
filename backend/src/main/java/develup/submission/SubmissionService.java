package develup.submission;

import java.util.List;
import develup.member.Member;
import develup.mission.Mission;
import develup.mission.MissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
class SubmissionService {

    private final MissionRepository missionRepository;
    private final SubmissionRepository submissionRepository;
    private final PairRepository pairRepository;

    public SubmissionService(
            MissionRepository missionRepository,
            SubmissionRepository submissionRepository,
            PairRepository pairRepository
    ) {
        this.missionRepository = missionRepository;
        this.submissionRepository = submissionRepository;
        this.pairRepository = pairRepository;
    }

    public SubmissionResponse submit(Member member, CreateSubmissionRequest request) {
        Mission mission = missionRepository.findById(request.missionId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 미션입니다."));
        Submission newSubmission = submissionRepository.save(request.toSubmission(member, mission));

        return SubmissionResponse.from(newSubmission);
    }

    public List<MyMissionResponse> getMyMissions(Member member) {
        List<Submission> submissions = submissionRepository.findAllByMember_IdOrderByIdDesc(member.getId());

        return submissions.stream()
                .map(this::findMyMission)
                .map(MyMissionResponse::from)
                .toList();
    }

    private MyMission findMyMission(Submission submission) {
        return pairRepository.findMyMissionBySubmission(submission)
                .orElseGet(() -> MyMission.waitPairMatching(submission));
    }
}
