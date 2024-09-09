package develup.domain.discussion;

import java.util.List;
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
                (LOWER(:missionTitle) = 'all' OR m.title = :missionTitle)
                AND
                (LOWER(:hashTag) = 'all' OR EXISTS (
                    SELECT 1
                    FROM DiscussionHashTag dht
                    JOIN dht.hashTag sht
                    WHERE dht.discussion.id = d.id
                    AND sht.name = :hashTag
                ))
            """)
    List<Discussion> findByMissionTitleAndHashTagName(
            @Param("missionTitle") String missionTitle,
            @Param("hashTag") String hashTagName
    );
}
