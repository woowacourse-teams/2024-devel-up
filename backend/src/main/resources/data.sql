INSERT INTO member (email, provider, social_id, name, image_url, created_at)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '구름', 'https://avatars.githubusercontent.com/u/75781414?v=4',
        '2024-08-16 13:40:00'),
       ('test1@gmail.com', 'GITHUB', '1234', '리브', 'https://avatars.githubusercontent.com/u/131349867?v=4',
        '2024-08-16 13:40:00'),
       ('test1@gmail.com', 'GITHUB', '1234', '아톰', 'https://avatars.githubusercontent.com/u/39932141?v=4',
        '2024-08-16 13:40:00');

INSERT INTO mission (title, thumbnail, summary, url)
VALUES ('주문', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-order.png',
        '배달 주문을 받아보자', 'https://github.com/develup-mission/java-order'),
       ('숫자 맞추기 게임', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-guessing-number.png',
        '숫자를 맞춰보자', 'https://github.com/develup-mission/java-guessing-number'),
       ('미로 탈출', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-maze.png',
        '미노타우로스를 피해 미로에서 탈출하세요!', 'https://github.com/develup-mission/java-maze'),
       ('엘리베이터 시뮬레이션', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-elevator.png',
        '엘리베이터를 만들어봐요.', 'https://github.com/develup-mission/java-elevator'),
       ('단어 퍼즐 게임', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-word-puzzle.png',
        '단어의 퍼즐들을 맞춰주세요!', 'https://github.com/develup-mission/java-word-puzzle'),
       ('리액트 회원가입/로그인 폼', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/react-auth-form.png',
        '리액트 회원가입/로그인 폼을 구현해봐요.', 'https://github.com/develup-mission/react-auth-form');

INSERT INTO hash_tag (name)
VALUES ('JAVA'),
       ('객체지향'),
       ('클린코드'),
       ('TYPESCRIPT'),
       ('REACT');

INSERT INTO mission_hash_tag (mission_id, hash_tag_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3),
       (3, 1),
       (3, 2),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3),
       (5, 1),
       (5, 2),
       (5, 3),
       (6, 4),
       (6, 5);

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


-- 'discussion' 테이블에 대한 테스트 데이터 삽입 SQL
-- Discussion 엔티티가 매핑되는 테이블 이름을 'discussion'로 가정합니다.

-- 테스트 데이터 삽입
INSERT INTO discussion (
    title, content, mission_id, member_id, created_at
) VALUES
('First Discussion', 'This is the content of the first discussion.', 1, 1, '2023-09-01 09:00:00'),
('Second Discussion', 'This is the content of the second discussion.', 2, 2, '2023-09-01 09:15:00');

-- 'discussion_hashtag' 테이블을 통해 해시태그 연결
-- Discussion과 HashTag가 N:M 관계로 연결되는 것을 가정하고 작성

INSERT INTO discussion_hash_tag (
    discussion_id, hash_tag_id
) VALUES
(1, 1),
(1, 2),
(2, 3);

-- 'mission', 'member', 'hashtag' 테이블에는 미리 데이터가 존재한다고 가정합니다.

-- 'discussion_comment' 테이블을 가정한 테스트 데이터를 만드는 SQL 스크립트
-- DiscussionComment 엔티티가 매핑될 테이블 이름을 'discussion_comment'로 가정합니다.

INSERT INTO discussion_comment (
    content, discussion_id, member_id, parent_comment_id, deleted_At, created_At
) VALUES
('This is the root comment.', 1, 1, NULL, NULL, '2023-09-01 10:00:00'),
('This is a reply to the root comment.', 1, 2, 1, NULL, '2023-09-01 10:05:00'),
('This is another root comment.', 2, 1, NULL, NULL, '2023-09-02 11:00:00'),
('This is a reply to the second root comment.', 2, 3, 3, NULL, '2023-09-02 11:10:00'),
('This comment has been deleted.', 2, 2, NULL, '2023-09-02 12:00:00', '2023-09-02 11:50:00');

-- 각 discussion_id와 member_id가 실제 존재한다고 가정합니다.
-- createdAt은 각 댓글이 생성된 시간으로 설정되었습니다.
-- deletedAt이 NULL이 아닌 경우 해당 댓글이 삭제된 것으로 간주합니다.
