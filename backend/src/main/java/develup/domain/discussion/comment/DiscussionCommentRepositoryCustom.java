package develup.domain.discussion.comment;

import static develup.domain.discussion.comment.QDiscussionComment.discussionComment;

import java.util.List;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiscussionCommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<DiscussionComment> findAllByDiscussionIdOrderByCreatedAtAsc(Long discussionId) {
        return queryFactory.selectFrom(discussionComment)
                .join(discussionComment.member).fetchJoin()
                .where(discussionComment.discussion.id.eq(discussionId))
                .orderBy(discussionComment.createdAt.asc())
                .fetch();
    }

    public List<MyDiscussionComment> findAllMyDiscussionComment(Long memberId) {
        return queryFactory.select(Projections.constructor(MyDiscussionComment.class,
                        discussionComment.id,
                        discussionComment.discussion.id,
                        discussionComment.content,
                        discussionComment.createdAt,
                        discussionComment.discussion.title.value
                ))
                .from(discussionComment)
                .join(discussionComment.member)
                .join(discussionComment.member)
                .where(discussionComment.member.id.eq(memberId).and(discussionComment.isNull()))
                .fetch();
    }
}
