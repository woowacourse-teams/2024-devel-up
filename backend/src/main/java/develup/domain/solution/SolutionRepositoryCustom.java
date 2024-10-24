package develup.domain.solution;

import static develup.domain.member.QMember.member;
import static develup.domain.mission.QMission.mission;
import static develup.domain.mission.QMissionHashTag.missionHashTag;
import static develup.domain.solution.QSolution.solution;
import static develup.domain.solution.comment.QSolutionComment.solutionComment;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import develup.domain.solution.comment.SolutionCommentCount;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SolutionRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

    public Page<Solution> findAllCompletedSolutionByHashTagName(
            String missionTitle,
            String hashTagName,
            PageRequest pageRequest
    ) {
        Long totalCount = queryFactory.select(solution.countDistinct())
                .from(solution)
                .join(solution.mission, mission)
                .join(mission.missionHashTags.hashTags, missionHashTag)
                .join(missionHashTag.hashTag)
                .where(
                        eqCompleted(),
                        eqMissionTitle(missionTitle),
                        eqHashTagName(hashTagName)
                )
                .fetchOne();

        List<Tuple> tuples = queryFactory.select(solution.id, solution.submittedAt)
                .from(solution)
                .join(solution.mission, mission)
                .join(mission.missionHashTags.hashTags, missionHashTag)
                .join(missionHashTag.hashTag)
                .where(
                        eqCompleted(),
                        eqMissionTitle(missionTitle),
                        eqHashTagName(hashTagName)
                )
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(solution.submittedAt.desc())
                .distinct()
                .fetch();

        List<Long> ids = new ArrayList<>(tuples.size());
        for (Tuple tuple : tuples) {
            ids.add(tuple.get(0, Long.class));
        }

        List<Solution> data = queryFactory.selectFrom(solution)
                .from(solution).fetchJoin()
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(solution.id.in(ids))
                .orderBy(solution.submittedAt.desc())
                .fetch();

        return new PageImpl<>(data, pageRequest, totalCount);
    }

    public List<Solution> findAllCompletedSolutionByHashTagName(String missionTitle, String hashTagName) {
        return queryFactory.selectFrom(solution)
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(
                        eqCompleted(),
                        eqMissionTitle(missionTitle),
                        eqHashTagName(hashTagName)
                )
                .orderBy(solution.submittedAt.desc())
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

        return JPAExpressions.selectOne()
                .from(missionHashTag)
                .join(missionHashTag.hashTag)
                .where(
                        missionHashTag.mission.id.eq(mission.id),
                        missionHashTag.hashTag.name.eq(hashTagName)
                )
                .exists();
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

        entityManager.flush();
        entityManager.clear();
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

    public Page<Solution> findPageByMemberIdOrderByDesc(Long memberId, PageRequest pageRequest) {
        long offset = pageRequest.getOffset();
        int limit = pageRequest.getPageSize();
        JPAQuery<Long> countQuery = getMemberSolutionCountQuery(memberId);
        List<Solution> data = fetchMemberSolutions(memberId, offset, limit);

        return PageableExecutionUtils.getPage(data, pageRequest, countQuery::fetchOne);
    }

    private JPAQuery<Long> getMemberSolutionCountQuery(Long memberId) {
        return queryFactory.select(solution.count())
                .from(solution)
                .where(solution.member.id.eq(memberId));
    }

    private List<Solution> fetchMemberSolutions(Long memberId, long offset, int limit) {
        return queryFactory.select(solution).distinct()
                .from(solution)
                .innerJoin(solution.member, member).fetchJoin()
                .join(solution.mission, mission).fetchJoin()
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag).fetchJoin()
                .where(member.id.eq(memberId))
                .orderBy(solution.submittedAt.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}
