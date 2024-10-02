package develup.domain.solution.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.solution.Solution;

public class SolutionCommentCounts {

    private final Map<Long, Long> solutionCommentCounts;

    public SolutionCommentCounts(List<SolutionCommentCount> solutionCommentCounts) {
        this.solutionCommentCounts = toMap(solutionCommentCounts);
    }

    private Map<Long, Long> toMap(List<SolutionCommentCount> solutionCommentCounts) {
        return solutionCommentCounts.stream()
                .collect(Collectors.toMap(SolutionCommentCount::id, SolutionCommentCount::count));
    }

    public Long getCount(Solution solution) {
        return solutionCommentCounts.getOrDefault(solution.getId(), 0L);
    }

    public Long getCount(Long solutionId) {
        return solutionCommentCounts.getOrDefault(solutionId, 0L);
    }
}
