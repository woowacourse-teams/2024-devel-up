INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '구름', 'www.naver.com');

INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '리브', 'www.naver.com');

INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '아톰', 'www.naver.com');

INSERT INTO mission (title, thumbnail, summary, url)
VALUES ('루터회관 흡연 단속', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-smoking.png',
        '담배피다 걸린 행성이를 위한 벌금 계산 미션', 'https://github.com/develup-mission/java-smoking');
INSERT INTO mission (title, thumbnail, summary, url)
VALUES ('숫자 맞추기 게임', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-guessing-number.png',
        '숫자를 맞춰보자', 'https://github.com/develup-mission/java-guessing-number');

INSERT INTO hash_tag (name) VALUES ('JAVA');
INSERT INTO hash_tag (name) VALUES ('객체지향');
INSERT INTO hash_tag (name) VALUES ('TDD');
INSERT INTO hash_tag (name) VALUES ('클린코드');
INSERT INTO hash_tag (name) VALUES ('레벨1');

INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (1, 1);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (1, 2);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (1, 3);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (1, 4);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (1, 5);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (2, 1);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (2, 2);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (2, 3);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (2, 4);
INSERT INTO mission_hash_tag (mission_id, hash_tag_id) VALUES (2, 5);

INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (1, 1, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (1, 2, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (1, 3, '라이언 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (2, 1, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (2, 2, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status)
VALUES (2, 3, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED');

-- root-1
-- ㄴ root-1-1
-- ㄴ root-1-2
-- root-2 (deleted, view o)
-- ㄴ root-2-1
-- ㄴ root-2-2 (deleted, view x)
-- root-3 (deleted, view x)
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '1', NULL, NULL, '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '2', NULL, '2021-08-01 00:00:00', '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '3', NULL, '2021-08-01 00:00:00', '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '2-1', 2, NULL, '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '1-1', 1, NULL, '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '2-2', 2, '2021-08-01 00:00:00', '2021-08-01 00:00:00');
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '1-2', 1, NULL, '2021-08-01 00:00:00');
