package develup.application.solution;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.mission.MissionRepositoryName;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import develup.domain.solution.SolutionSummary;
import develup.domain.solution.Title;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SolutionService {

    private static final String URL_REGEX = "https://github\\.com/develup-mission/([^/]+)/pull/([0-9]+)";
    private static final Pattern URL_PATTERN = Pattern.compile(URL_REGEX);

    private final SolutionRepository solutionRepository;
    private final MissionRepository missionRepository;
    private final MemberRepository memberRepository;

    public SolutionService(
            SolutionRepository solutionRepository,
            MissionRepository missionRepository,
            MemberRepository memberRepository
    ) {
        this.solutionRepository = solutionRepository;
        this.missionRepository = missionRepository;
        this.memberRepository = memberRepository;
    }

    public SolutionResponse startMission(Long memberId, Long missionId) {
        validateAlreadyStarted(memberId, missionId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));

        return SolutionResponse.start(creatSolution(member, mission));
    }

    private void validateAlreadyStarted(Long memberId, Long missionId) {
        boolean alreadyStarted = solutionRepository.existsByMember_IdAndMission_IdAndStatus(memberId, missionId,
                SolutionStatus.IN_PROGRESS);
        if (alreadyStarted) {
            throw new DevelupException(ExceptionType.SOLUTION_ALREADY_STARTED);
        }
    }

    private Solution creatSolution(Member member, Mission mission) {
        Solution solution = Solution.start(mission, member);

        return solutionRepository.save(solution);
    }

    public SolutionResponse submit(Long memberId, SolutionRequest solutionRequest) {
        Solution solution = solutionRepository.findByMember_IdAndMission_IdAndStatus(
                memberId,
                solutionRequest.missionId(),
                SolutionStatus.IN_PROGRESS
        );

        validatePullRequestUrl(solutionRequest.url());
        SolutionSubmit solutionSubmit = new SolutionSubmit(
                new Title(solutionRequest.title()),
                solutionRequest.description(),
                solutionRequest.url()
        );
        solution.submit(solutionSubmit);

        return SolutionResponse.from(solution);
    }

    private void validatePullRequestUrl(String url) {
        Matcher matcher = URL_PATTERN.matcher(url);
        if (!matcher.matches()) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }

        String repositoryName = matcher.group(1);
        if (!MissionRepositoryName.contains(repositoryName)) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }
    }

    public SolutionResponse getById(Long id) {
        Solution solution = solutionRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));

        return SolutionResponse.from(solution);
    }

    public List<SolutionSummary> getCompletedSummaries() {
        return solutionRepository.findCompletedSummaries();
    }
}
