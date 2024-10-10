package develup.domain.solution;

import static develup.domain.member.QMember.member;
import static develup.domain.mission.QMission.mission;
import static develup.domain.mission.QMissionHashTag.missionHashTag;
import static develup.domain.solution.QSolution.solution;
import static develup.domain.solution.comment.QSolutionComment.solutionComment;

import java.util.List;
import java.util.Optional;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import develup.domain.solution.comment.SolutionCommentCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SolutionRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<Solution> findAllCompletedSolutionByHashTagName(String name) {
        return queryFactory.selectFrom(solution)
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(
                        solution.status.eq(SolutionStatus.COMPLETED)
                                .and(JPAExpressions.selectOne()
                                        .from(missionHashTag)
                                        .join(missionHashTag.hashTag)
                                        .where(
                                                missionHashTag.mission.id.eq(mission.id)
                                                        .and(eqHashTagName(name))
                                        )
                                        .exists()
                                )
                )
                .orderBy(solution.id.desc())
                .fetch();
    }

    private BooleanExpression eqHashTagName(String name) {
        if ("all".equalsIgnoreCase(name)) {
            return null;
        }

        return missionHashTag.hashTag.name.eq(name);
    }

    public Optional<Solution> findFetchById(Long solutionId) {
        return Optional.ofNullable(queryFactory.selectFrom(solution)
                .join(solution.member, member).fetchJoin()
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(solution.id.eq(solutionId))
                .fetchOne()
        );
    }

    public void deleteAllComments(Long solutionId) {
        queryFactory.delete(solutionComment)
                .where(solutionComment.solution.id.eq(solutionId))
                .execute();
    }

    public List<SolutionCommentCount> findAllSolutionCommentCounts() {
        return queryFactory.select(Projections.constructor(
                        SolutionCommentCount.class,
                        solution.id,
                        solutionComment.count()
                )).from(solution)
                .join(solutionComment)
                .on(solutionComment.solution.id.eq(solution.id))
                .where(solutionComment.deletedAt.isNull().and(solutionComment.parentCommentId.isNull()))
                .groupBy(solution.id)
                .fetch();
    }
}
