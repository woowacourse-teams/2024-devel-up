INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '구름', 'www.naver.com');

INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '리브', 'www.naver.com');

INSERT INTO member (email, provider, social_id, name, image_url)
VALUES ('test1@gmail.com', 'GITHUB', '1234', '아톰', 'www.naver.com');

INSERT INTO mission (title, thumbnail, url)
VALUES ('루터회관 흡연 단속', 'https://raw.githubusercontent.com/develup-mission/docs/b8c5d4d0e77de4473c78a44732c4746687583b08/image/java-smoking.png', 'https://github.com/develup-mission/java-smoking');
INSERT INTO mission (title, thumbnail, url)
VALUES ('java-guessing-number', 'https://raw.githubusercontent.com/develup-mission/docs/main/image/java-smoking.png','https://github.com/develup-mission/java-guessing-number');

INSERT INTO solution (mission_id, member_id, title, description, url, status) values (1, 1, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status) values (1, 2, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status) values (1, 3, '라이언 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status) values (2, 1, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status) values (2, 2, '릴리 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
INSERT INTO solution (mission_id, member_id, title, description, url, status) values (2, 3, '아톰 미션 제출합니다.', '안녕하세요. 잘 부탁 드립니다.', "https://github.com/develup/mission/pull/1", 'COMPLETED');
