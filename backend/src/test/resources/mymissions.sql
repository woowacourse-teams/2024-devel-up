INSERT INTO mission (title, language, description, thumbnail, url)
VALUES ('루터회관 흡연 단속', 'JAVA', 'https://raw.githubusercontent.com/develup-mission/java-smoking/main/README.md',
        'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-smoking.png',
        'https://github.com/develup-mission/java-smoking');

INSERT INTO mission (title, language, description, thumbnail, url)
VALUES ('단어 퍼즐 게임', 'JAVA', 'https://raw.githubusercontent.com/develup-mission/java-word-puzzle/main/README.md',
        'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-guessing-number.png',
        'https://github.com/develup-mission/java-word-puzzle');

INSERT INTO mission (title, language, description, thumbnail, url)
VALUES ('숫자 추리 게임', 'JAVA', 'https://raw.githubusercontent.com/develup-mission/java-guessing-number/main/README.md',
        'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-word-puzzle.png',
        'https://github.com/develup-mission/java-guessing-number');

INSERT INTO member (id, email, provider, social_id, name, image_url)
VALUES (1, 'test1@gmail.com', 'GITHUB', '1234', '구름', 'www.naver.com');

INSERT INTO member (id, email, provider, social_id, name, image_url)
VALUES (2, 'test1@gmail.com', 'GITHUB', '1234', '리브', 'www.naver.com');

INSERT INTO member (id, email, provider, social_id, name, image_url)
VALUES (3, 'test1@gmail.com', 'GITHUB', '1234', '아톰', 'www.naver.com');

INSERT INTO submission (member_id, mission_id, url, comment)
VALUES (1, 1, 'https://github.com/develup-mission/java-smoking/pull/1', '코멘트 1');

INSERT INTO submission (member_id, mission_id, url, comment)
VALUES (2, 1, 'https://github.com/develup-mission/java-smoking/pull/2', '코멘트 2');

INSERT INTO submission (member_id, mission_id, url, comment)
VALUES (1, 2, 'https://github.com/develup-mission/java-word-puzzle/pull/1', '코멘트 3');

INSERT INTO submission (member_id, mission_id, url, comment)
VALUES (2, 2, 'https://github.com/develup-mission/java-word-puzzle/pull/2', '코멘트 4');

INSERT INTO submission (member_id, mission_id, url, comment)
VALUES (1, 3, 'https://github.com/develup-mission/java-guessing-number/pull/1', '코멘트 5');

INSERT INTO pair (main_submission, pair_submission, status)
VALUES (1, 2, 'ALL_FINISHED');

INSERT INTO pair (main_submission, pair_submission, status)
VALUES (2, 1, 'ALL_FINISHED');

INSERT INTO pair (main_submission, pair_submission, status)
VALUES (3, 4, 'REVIEW_FINISHED');

INSERT INTO pair (main_submission, pair_submission, status)
VALUES (4, 3, 'IN_PROGRESS');
