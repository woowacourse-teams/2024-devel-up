package develup.mission;

import java.util.List;
import develup.member.Member;
import develup.submission.SubmissionRepository;
import org.springframework.stereotype.Service;

@Service
class MissionService {

    private final MissionRepository missionRepository;
    private final SubmissionRepository submissionRepository;

    public MissionService(MissionRepository missionRepository, SubmissionRepository submissionRepository) {
        this.missionRepository = missionRepository;
        this.submissionRepository = submissionRepository;
    }

    public List<MissionResponse> getMissions() {
        return missionRepository.findAll()
                .stream()
                .map(MissionResponse::from)
                .toList();
    }

    public MissionResponse getMissionById(Long missionId, Member member, boolean guest) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 미션입니다."));

        if (guest) {
            return MissionResponse.from(mission);
        }

        return submissionRepository.findFirstByMember_IdAndMission_IdOrderByIdDesc(member.getId(), missionId)
                .map(submission -> MissionResponse.of(mission, true, submission.getUrl()))
                .orElseGet(() -> MissionResponse.from(mission));
    }
}
