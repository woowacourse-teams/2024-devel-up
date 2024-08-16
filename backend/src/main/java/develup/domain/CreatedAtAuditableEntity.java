package develup.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class CreatedAtAuditableEntity extends IdentifiableEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdAt;

    protected CreatedAtAuditableEntity() {
    }

    protected CreatedAtAuditableEntity(Long id) {
        super(id);
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
