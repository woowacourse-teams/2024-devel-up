package develup.domain.discussion;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DiscussionHashTagId implements Serializable {

    @Column(nullable = false)
    private Long discussionId;

    @Column(nullable = false)
    private Long hashTagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiscussionHashTagId that = (DiscussionHashTagId) o;
        return Objects.equals(discussionId, that.discussionId) && Objects.equals(hashTagId, that.hashTagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(discussionId, hashTagId);
    }
}
