INSERT INTO member (email, provider, social_id, name, image_url, created_at)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '구름', 'https://avatars.githubusercontent.com/u/75781414?v=4',
        '2024-08-16 13:40:00'),
       ('test1@gmail.com', 'GITHUB', '1234', '리브', 'https://avatars.githubusercontent.com/u/131349867?v=4',
        '2024-08-16 13:40:00'),
       ('test1@gmail.com', 'GITHUB', '1234', '아톰', 'https://avatars.githubusercontent.com/u/39932141?v=4',
        '2024-08-16 13:40:00');

INSERT INTO mission (title, thumbnail, summary, url)
VALUES ('루터회관 흡연 단속', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-smoking.png',
        '담배피다 걸린 행성이를 위한 벌금 계산 미션', 'https://github.com/develup-mission/java-smoking'),
       ('숫자 맞추기 게임', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-guessing-number.png',
        '숫자를 맞춰보자', 'https://github.com/develup-mission/java-guessing-number');

INSERT INTO hash_tag (name)
VALUES ('JAVA'),
       ('객체지향'),
       ('TDD'),
       ('클린코드'),
       ('레벨1');

INSERT INTO mission_hash_tag (mission_id, hash_tag_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (2, 1),
       (2, 2),
       (2, 3),
       (2, 4),
       (2, 5);

INSERT INTO solution (mission_id, member_id, title, description, url, status, created_at)
VALUES (1, 1, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00'),
       (1, 2, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00'),
       (1, 3, '라이언 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00'),
       (2, 1, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00'),
       (2, 2, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00'),
       (2, 3, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', 'https://github.com/develup/mission/pull/1', 'COMPLETED',
        '2024-08-16 13:40:00');

-- root-1
-- ㄴ root-1-1
-- ㄴ root-1-2
-- root-2 (deleted, view o)
-- ㄴ root-2-1
-- ㄴ root-2-2 (deleted, view x)
-- root-3 (deleted, view x)
INSERT INTO solution_comment (solution_id, member_id, content, parent_comment_id, deleted_at, created_at)
VALUES (1, 1, '1', NULL, NULL, '2024-08-16 13:40:00'),
       (1, 1, '2', NULL, '2024-08-12 13:40:00', '2024-08-16 13:40:00'),
       (1, 1, '3', NULL, '2024-08-12 13:40:00', '2024-08-16 13:40:00'),
       (1, 1, '2-1', 2, NULL, '2024-08-16 13:40:00'),
       (1, 1, '1-1', 1, NULL, '2024-08-16 13:40:00'),
       (1, 1, '2-2', 2, '2024-08-12 13:40:00', '2024-08-16 13:40:00'),
       (1, 1, '1-2', 1, NULL, '2024-08-16 13:40:00');
