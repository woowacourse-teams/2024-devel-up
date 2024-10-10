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
import com.querydsl.jpa.impl.JPAQueryFactory;
import develup.domain.solution.comment.SolutionCommentCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SolutionRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<Solution> findAllCompletedSolutionByHashTagName(String missionTitle, String hashTagName) {
        return queryFactory.selectFrom(solution)
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(eqCompleted(), eqMissionTitle(missionTitle), eqHashTagName(hashTagName))
                .orderBy(solution.id.desc())
                .fetch();
    }

    private BooleanExpression eqCompleted() {
        return solution.status.eq(SolutionStatus.COMPLETED);
    }

    private BooleanExpression eqMissionTitle(String missionTitle) {
        if ("all".equalsIgnoreCase(missionTitle)) {
            return null;
        }

        return mission.title.eq(missionTitle);
    }

    private BooleanExpression eqHashTagName(String hashTagName) {
        if ("all".equalsIgnoreCase(hashTagName)) {
            return null;
        }

        return missionHashTag.hashTag.name.eq(hashTagName);
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
