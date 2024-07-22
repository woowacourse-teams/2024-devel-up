import { Link, useNavigate } from 'react-router-dom';
import * as S from './MyMissionCompleted.styled';

const mocks = [
  {
    id: 1,
    mission: {
      id: 1,
      title: '루터회관 흡연 단속',
      language: 'JAVA',
      description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
      thumbnail:
        'https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg',
      url: 'https://github.com/develup-mission/java-smoking',
    },
    myPrLink: 'https://github.com/develup-mission/java-smoking/pull/1',
    pairPrLink: 'https://github.com/develup-mission/java-smoking/pull/2',
    status: '리뷰 완료',
  },
  {
    id: 2,
    mission: {
      id: 2,
      title: '루터회관 흡연 단속 2',
      language: 'JAVA',
      description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
      thumbnail:
        'https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg',
      url: 'https://github.com/develup-mission/java-smoking',
    },
    myPrLink: 'https://github.com/develup-mission/java-smoking/pull/1',
    pairPrLink: 'https://github.com/develup-mission/java-smoking/pull/2',
    status: '리뷰 완료',
  },
  {
    id: 3,
    mission: {
      id: 2,
      title: '루터회관 흡연 단속 3',
      language: 'JAVA',
      description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
      thumbnail:
        'https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg',
      url: 'https://github.com/develup-mission/java-smoking',
    },
    myPrLink: 'https://github.com/develup-mission/java-smoking/pull/1',
    pairPrLink: 'https://github.com/develup-mission/java-smoking/pull/2',
    status: '리뷰 완료',
  },
  {
    id: 4,
    mission: {
      id: 2,
      title: '루터회관 흡연 단속 4',
      language: 'JAVA',
      description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
      thumbnail:
        'https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg',
      url: 'https://github.com/develup-mission/java-smoking',
    },
    myPrLink: 'https://github.com/develup-mission/java-smoking/pull/1',
    pairPrLink: 'https://github.com/develup-mission/java-smoking/pull/2',
    status: '리뷰 완료',
  },
];

export default function MyMissionCompleted() {
  const navigate = useNavigate();

  const handleMissionClick = (id: number) => {
    navigate(`/missions/${id}`);
  };

  return (
    <S.MyMissionCompletedContainer>
      <S.Title>완료한 미션</S.Title>
      <S.MissionCardListWrapper>
        {mocks.map(({ id, mission, pairPrLink, myPrLink }) => (
          <S.MissionCardWrapper key={id} onClick={() => handleMissionClick(id)}>
            <S.MissionCardHeaderWrapper>
              <S.ThumbnailImg src={mission.thumbnail} />
              <S.MissionLanguageBox>{mission.language}</S.MissionLanguageBox>
            </S.MissionCardHeaderWrapper>

            <S.MissionCardContentWrapper>
              <div>
                <S.MissionTitle>{mission.title}</S.MissionTitle>
                <S.MissionDate>2024.07.17 ~ 2024.07.24</S.MissionDate>
              </div>

              <S.PrButtonWrapper>
                <Link to={pairPrLink} target="_blank" onClick={(e) => e.stopPropagation()}>
                  <S.PrButton>페어 PR 이동</S.PrButton>
                </Link>
                <Link to={myPrLink} target="_blank" onClick={(e) => e.stopPropagation()}>
                  <S.PrButton>내 PR 이동</S.PrButton>
                </Link>
              </S.PrButtonWrapper>
            </S.MissionCardContentWrapper>
          </S.MissionCardWrapper>
        ))}
      </S.MissionCardListWrapper>
    </S.MyMissionCompletedContainer>
  );
}
