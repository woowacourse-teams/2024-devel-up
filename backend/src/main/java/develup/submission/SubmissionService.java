package develup.submission;

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

    public SubmissionService(MissionRepository missionRepository, SubmissionRepository submissionRepository) {
        this.missionRepository = missionRepository;
        this.submissionRepository = submissionRepository;
    }

    public SubmissionResponse submit(Member member, CreateSubmissionRequest request) {
        Mission mission = missionRepository.findById(request.missionId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 미션입니다."));
        Submission newSubmission = submissionRepository.save(request.toSubmission(member, mission));
        return SubmissionResponse.of(newSubmission);
    }
}
