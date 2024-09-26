package develup.domain.discussion.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.discussion.Discussion;

public class DiscussionCommentCounts {

    private final List<DiscussionCommentCount> discussionCommentCounts;
    private final Map<Long, Long> discussionCommentCountsMap;

    public DiscussionCommentCounts(List<DiscussionCommentCount> discussionCommentCounts) {
        this.discussionCommentCounts = discussionCommentCounts;
        this.discussionCommentCountsMap = toMap(discussionCommentCounts);
    }

    private Map<Long, Long> toMap(List<DiscussionCommentCount> discussionCommentCounts) {
        return discussionCommentCounts.stream()
                .collect(Collectors.toMap(DiscussionCommentCount::id, DiscussionCommentCount::count));
    }

    public Long getCount(Discussion discussion) {
        return discussionCommentCountsMap.getOrDefault(discussion.getId(), 0L);
    }
}
