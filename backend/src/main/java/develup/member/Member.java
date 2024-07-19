package develup.member;

import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Column(nullable = false)
    private Long socialId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    protected Member() {
    }

    public Member(String email, Provider provider, Long socialId, String name, String imageUrl) {
        this(null, email, provider, socialId, name, imageUrl);
    }

    public Member(Long id, String email, Provider provider, Long socialId, String name, String imageUrl) {
        this.id = id;
        this.email = email;
        this.provider = provider;
        this.socialId = socialId;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Provider getProvider() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Member member)) {
            return false;
        }

        return this.getId() != null && Objects.equals(getId(), member.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
