package develup.domain.member;

import develup.domain.CreatedAtAuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Member extends CreatedAtAuditableEntity {

    @Column
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OAuthProvider provider;

    @Column(nullable = false)
    private Long socialId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    protected Member() {
    }

    public Member(String email, OAuthProvider provider, Long socialId, String name, String imageUrl) {
        this(null, email, provider, socialId, name, imageUrl);
    }

    public Member(Long id, String email, OAuthProvider provider, Long socialId, String name, String imageUrl) {
        super(id);
        this.id = id;
        this.email = email;
        this.provider = provider;
        this.socialId = socialId;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public String getEmail() {
        return email;
    }

    public OAuthProvider getProvider() {
        return provider;
    }

    public Long getSocialId() {
        return socialId;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
