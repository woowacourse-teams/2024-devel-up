package develup.domain.solution.comment;

import static develup.domain.member.QMember.member;
import static develup.domain.solution.comment.QSolutionComment.solutionComment;

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
public class SolutionCommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<SolutionComment> findAllBySolutionIdOrderByCreatedAtAsc(Long solutionId) {
        return queryFactory
                .selectFrom(solutionComment)
                .join(solutionComment.member, member).fetchJoin()
                .where(solutionComment.solution.id.eq(solutionId))
                .orderBy(solutionComment.createdAt.asc())
                .fetch();
    }

    public List<MySolutionComment> findAllMySolutionCommentOrderByDesc(Long memberId) {
        return queryFactory
                .select(Projections.constructor(MySolutionComment.class,
                        solutionComment.id,
                        solutionComment.solution.id,
                        solutionComment.content,
                        solutionComment.createdAt,
                        solutionComment.solution.title.value
                ))
                .from(solutionComment)
                .join(solutionComment.solution)
                .join(solutionComment.member)
                .where(solutionComment.member.id.eq(memberId).and(solutionComment.deletedAt.isNull()))
                .orderBy(solutionComment.createdAt.desc())
                .fetch();
    }

    public Page<MySolutionComment> findAllMySolutionCommentOrderByDesc(Long memberId, Pageable pageable) {
        List<MySolutionComment> mySolutionComments = queryFactory
                .select(Projections.constructor(MySolutionComment.class,
                        solutionComment.id,
                        solutionComment.solution.id,
                        solutionComment.content,
                        solutionComment.createdAt,
                        solutionComment.solution.title.value
                ))
                .from(solutionComment)
                .join(solutionComment.solution)
                .join(solutionComment.member)
                .where(solutionComment.member.id.eq(memberId).and(solutionComment.deletedAt.isNull()))
                .orderBy(solutionComment.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory
                .select(solutionComment.count())
                .from(solutionComment)
                .where(solutionComment.member.id.eq(memberId).and(solutionComment.deletedAt.isNull()));

        return PageableExecutionUtils.getPage(mySolutionComments, pageable, count::fetchOne);
    }
}
