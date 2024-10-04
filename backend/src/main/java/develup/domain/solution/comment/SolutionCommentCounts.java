package develup.domain.solution.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SolutionCommentCounts {

    private final Map<Long, Long> solutionCommentCounts;

    public SolutionCommentCounts(List<SolutionCommentCount> solutionCommentCounts) {
        this.solutionCommentCounts = toMap(solutionCommentCounts);
    }

    private Map<Long, Long> toMap(List<SolutionCommentCount> solutionCommentCounts) {
        return solutionCommentCounts.stream()
                .collect(Collectors.toMap(SolutionCommentCount::id, SolutionCommentCount::count));
    }

    public Long getCount(Long solutionId) {
        return solutionCommentCounts.getOrDefault(solutionId, 0L);
    }
}
