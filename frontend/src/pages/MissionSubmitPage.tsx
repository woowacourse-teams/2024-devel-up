// import { useParams } from 'react-router-dom';
import MissionImage from '@/components/missionSubmit/MissionThumbnail';
import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/missionSubmit/SubmitBanner';
import PRLink from '@/components/missionSubmit/PRLink';
import OneWord from '@/components/missionSubmit/OneWord';
import SubmitButton from '@/components/missionSubmit/SubmitButton';
import MissionSubmitForm from '@/components/missionSubmit/MissionSubmitForm';

const MOCK_MISSION = {
  data: {
    id: 1,
    title: '루터회관 흡연 단속',
    language: 'JAVA',
    description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
    thumbnail:
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/38a7f41b-80d7-48ca-97c9-99ceda5c4dbd/smoking.png?id=60756a7a-c50f-4946-ab6e-4177598b926b&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721174400000&signature=todzUdb5cUyzW4ZQNaHvL-uiCngfMJJAl94RpE1TGEA&downloadName=smoking.png',
    url: 'https://github.com/develup-mission/java-smoking',
  },
};

export default function MissionSubmitPage() {
  // const { id } = useParams();
  const { thumbnail, title, language } = MOCK_MISSION.data;

  const handleMissionSubmit = () => {
    alert('미션 제출에 성공하였어요! 페어가 매칭 되면 알려드릴게요!');
  };

  return (
    <S.Container>
      <MissionImage thumbnail={thumbnail} title={title} language={language} />
      <SubmitBanner />
      <MissionSubmitForm>
        <PRLink />
        <OneWord />
        <SubmitButton onSubmitMission={handleMissionSubmit} />
      </MissionSubmitForm>
    </S.Container>
  );
}
