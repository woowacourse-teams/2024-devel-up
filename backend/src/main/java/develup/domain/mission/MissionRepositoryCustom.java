package develup.domain.mission;

import static develup.domain.hashtag.QHashTag.hashTag;
import static develup.domain.mission.QMission.mission;
import static develup.domain.mission.QMissionHashTag.missionHashTag;

import java.util.List;
import java.util.Optional;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MissionRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public Optional<Mission> findHashTaggedMissionById(Long id) {
        return Optional.ofNullable(
                queryFactory
                        .selectFrom(mission)
                        .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                        .join(missionHashTag.hashTag, hashTag).fetchJoin()
                        .where(mission.id.eq(id))
                        .fetchOne()
        );
    }

    public List<Mission> findAllByHashTagName(String name) {
        return queryFactory
                .selectFrom(mission)
                .join(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .join(missionHashTag.hashTag, hashTag).fetchJoin()
                .where(
                        existsSubQueryForHashTag(name)
                )
                .fetch();
    }

    private BooleanExpression existsSubQueryForHashTag(String name) {
        return JPAExpressions
                .selectOne()
                .from(missionHashTag)
                .join(missionHashTag.hashTag, hashTag)
                .where(
                        missionHashTag.mission.id.eq(QMission.mission.id)
                                .and(nameCondition(name))
                )
                .exists();
    }

    private BooleanExpression nameCondition(String name) {
        if ("all".equalsIgnoreCase(name)) {
            return null;
        }
        return hashTag.name.eq(name);
    }
}
