CREATE TABLE member (
    id BIGINT AUTO_INCREMENT,
    email VARCHAR(255),
    provider VARCHAR(255) NOT NULL CHECK (provider IN ('GITHUB')),
    social_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    CONSTRAINT pk_member PRIMARY KEY (id)
);

CREATE TABLE mission (
    id BIGINT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    CONSTRAINT pk_mission PRIMARY KEY (id)
);

CREATE TABLE discussion (
    id BIGINT AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT NOT NULL,
    mission_id BIGINT,
    member_id BIGINT NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    CONSTRAINT pk_discussion PRIMARY KEY (id),
    CONSTRAINT fk_discussion_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_discussion_mission FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE discussion_comment (
    id BIGINT AUTO_INCREMENT,
    content TEXT NOT NULL,
    discussion_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    parent_comment_id BIGINT,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) NOT NULL,
    CONSTRAINT pk_discussion_comment PRIMARY KEY (id),
    CONSTRAINT fk_discussion_comment_discussion FOREIGN KEY (discussion_id) REFERENCES discussion(id),
    CONSTRAINT fk_discussion_comment_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_discussion_comment_discussion_comment FOREIGN KEY (parent_comment_id) REFERENCES discussion_comment(id)
);

CREATE TABLE hash_tag (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_hash_tag PRIMARY KEY (id)
);

CREATE TABLE discussion_hash_tag (
    discussion_id BIGINT NOT NULL,
    hash_tag_id BIGINT NOT NULL,
    CONSTRAINT pk_discussion_hash_tag PRIMARY KEY (discussion_id, hash_tag_id),
    CONSTRAINT fk_discussion_hash_tag_discussion FOREIGN KEY (discussion_id) REFERENCES discussion(id),
    CONSTRAINT fk_discussion_hash_tag_hash_tag FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id)
);

CREATE TABLE mission_hash_tag (
    id BIGINT AUTO_INCREMENT,
    mission_id BIGINT NOT NULL,
    hash_tag_id BIGINT NOT NULL,
    CONSTRAINT pk_mission_hash_tag PRIMARY KEY (id),
    CONSTRAINT fk_mission_hash_tag_hash_tag FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id),
    CONSTRAINT fk_mission_hash_tag_mission FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE solution (
    id BIGINT AUTO_INCREMENT,
    mission_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    status VARCHAR(255) NOT NULL CHECK (status IN ('IN_PROGRESS','COMPLETED')),
    created_at TIMESTAMP(6) NOT NULL,
    CONSTRAINT pk_solution PRIMARY KEY (id),
    CONSTRAINT fk_solution_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_solution_mission FOREIGN KEY (mission_id) REFERENCES mission(id)
);

CREATE TABLE solution_comment (
    id BIGINT AUTO_INCREMENT,
    content TEXT NOT NULL,
    solution_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    parent_comment_id BIGINT,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) NOT NULL,
    CONSTRAINT pk_solution_comment PRIMARY KEY (id),
    CONSTRAINT fk_solution_comment_member FOREIGN KEY (member_id) REFERENCES member(id),
    CONSTRAINT fk_solution_comment_solution_comment FOREIGN KEY (parent_comment_id) REFERENCES solution_comment(id),
    CONSTRAINT fk_solution_comment_solution FOREIGN KEY (solution_id) REFERENCES solution(id)
);
