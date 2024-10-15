package develup.domain.discussion.comment;

import static develup.domain.discussion.QDiscussion.discussion;
import static develup.domain.discussion.comment.QDiscussionComment.discussionComment;
import static develup.domain.member.QMember.member;

import java.util.List;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiscussionCommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<DiscussionComment> findAllByDiscussionIdOrderByCreatedAtAsc(Long discussionId) {
        return queryFactory.selectFrom(discussionComment)
                .join(discussionComment.member, member).fetchJoin()
                .where(discussionComment.discussion.id.eq(discussionId))
                .orderBy(discussionComment.createdAt.asc())
                .fetch();
    }

    public List<MyDiscussionComment> findAllMyDiscussionCommentOrderByCreatedAtDesc(Long memberId) {
        return queryFactory.select(Projections.constructor(MyDiscussionComment.class,
                        discussionComment.id,
                        discussionComment.discussion.id,
                        discussionComment.content,
                        discussionComment.createdAt,
                        discussion.title.value
                ))
                .from(discussionComment)
                .join(discussionComment.discussion, discussion)
                .join(discussionComment.member)
                .where(discussionComment.member.id.eq(memberId).and(discussionComment.deletedAt.isNull()))
                .orderBy(discussionComment.createdAt.desc())
                .fetch();
    }

    public Page<MyDiscussionComment> findPageMyDiscussionCommentOrderByCreatedAtDesc(Long memberId, Pageable pageRequest) {
        long offset = pageRequest.getOffset();
        int limit = pageRequest.getPageSize();
        JPAQuery<Long> countQuery = getMemberDiscussionCommentCountQuery(memberId);
        List<MyDiscussionComment> data = fetchMemberDiscussionComments(memberId, offset, limit);

        return PageableExecutionUtils.getPage(data, pageRequest, countQuery::fetchOne);
    }

    private JPAQuery<Long> getMemberDiscussionCommentCountQuery(Long memberId) {
        return queryFactory.select(discussionComment.count())
                .from(discussionComment)
                .where(discussionComment.member.id.eq(memberId).and(discussionComment.deletedAt.isNull()));
    }

    private List<MyDiscussionComment> fetchMemberDiscussionComments(Long memberId, Long offset, Integer limit) {
        return queryFactory.select(Projections.constructor(MyDiscussionComment.class,
                        discussionComment.id,
                        discussionComment.discussion.id,
                        discussionComment.content,
                        discussionComment.createdAt,
                        discussion.title.value
                ))
                .from(discussionComment)
                .join(discussionComment.discussion, discussion)
                .join(discussionComment.member)
                .where(discussionComment.member.id.eq(memberId).and(discussionComment.deletedAt.isNull()))
                .orderBy(discussionComment.createdAt.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}
