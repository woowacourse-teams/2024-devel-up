package develup.domain.discussion;

import java.util.List;
import java.util.Optional;
import develup.domain.discussion.comment.DiscussionCommentCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    @Query("""
            SELECT d
            FROM Discussion d
            JOIN FETCH d.mission m
            JOIN FETCH d.discussionHashTags.hashTags dhts
            JOIN FETCH dhts.hashTag ht
            WHERE
                (LOWER(:mission) = 'all' OR m.title = :mission)
                AND
                (LOWER(:hashTag) = 'all' OR EXISTS (
                    SELECT 1
                    FROM DiscussionHashTag dht
                    JOIN dht.hashTag sht
                    WHERE dht.discussion.id = d.id
                    AND sht.name = :hashTag
                ))
            """)
    List<Discussion> findAllByMissionAndHashTagName(
            @Param("mission") String mission,
            @Param("hashTag") String hashTagName
    );

    @Query("""
            SELECT d
            FROM Discussion d
            JOIN FETCH d.mission m
            JOIN FETCH m.missionHashTags.hashTags mhts
            JOIN FETCH d.member me
            JOIN FETCH d.discussionHashTags.hashTags dhts
            JOIN FETCH dhts.hashTag ht
            WHERE d.id = :id
            """)
    Optional<Discussion> findFetchById(Long id);

    @Query("""
            SELECT d
            FROM Discussion d
            JOIN FETCH d.mission m
            JOIN FETCH d.member me
            JOIN FETCH d.discussionHashTags.hashTags dhts
            JOIN FETCH dhts.hashTag ht
            WHERE me.id = :memberId
            """)
    List<Discussion> findAllByMember_Id(Long memberId);

    @Query("""
                SELECT new develup.domain.discussion.comment.DiscussionCommentCount(
                    d.id, count(dc)
                )
                FROM Discussion d
                JOIN FETCH DiscussionComment dc
                ON dc.discussion.id = d.id
                GROUP BY d.id
            """)
    List<DiscussionCommentCount> findDiscussionCommentCounts();
}
