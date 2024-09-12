package develup.domain.hashtag;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {

    List<HashTag> findByIdIn(List<Long> hashTagIds);
}
