CREATE TABLE member (
    created_at TIMESTAMP(6) NOT NULL,
    id BIGINT AUTO_INCREMENT,
    social_id BIGINT NOT NULL,
    email VARCHAR(255),
    image_url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL CHECK (provider IN ('GITHUB')),
    PRIMARY KEY (id)
);

CREATE TABLE mission (
    id BIGINT AUTO_INCREMENT,
    summary VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE discussion (
    created_at TIMESTAMP(6) NOT NULL,
    id BIGINT AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    mission_id BIGINT,
    content TEXT NOT NULL,
    title VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE discussion_comment (
    created_at TIMESTAMP(6) NOT NULL,
    deleted_at TIMESTAMP(6),
    discussion_id BIGINT NOT NULL,
    id BIGINT AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    parent_comment_id BIGINT,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (discussion_id) REFERENCES discussion(id),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (parent_comment_id) REFERENCES discussion_comment(id)
);

CREATE TABLE hash_tag (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE discussion_hash_tag (
    discussion_id BIGINT NOT NULL,
    hash_tag_id BIGINT NOT NULL,
    PRIMARY KEY (discussion_id, hash_tag_id),
    FOREIGN KEY (discussion_id) REFERENCES discussion(id),
    FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id)
);

CREATE TABLE mission_hash_tag (
    hash_tag_id BIGINT NOT NULL,
    id BIGINT AUTO_INCREMENT,
    mission_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE solution (
    created_at TIMESTAMP(6) NOT NULL,
    id BIGINT AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    mission_id BIGINT NOT NULL,
    description TEXT,
    status VARCHAR(255) NOT NULL CHECK (status IN ('IN_PROGRESS','COMPLETED')),
    title VARCHAR(255),
    url VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE solution_comment (
    created_at TIMESTAMP(6) NOT NULL,
    deleted_at TIMESTAMP(6),
    id BIGINT AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    parent_comment_id BIGINT,
    solution_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (parent_comment_id) REFERENCES solution_comment(id),
    FOREIGN KEY (solution_id) REFERENCES solution(id)
);
