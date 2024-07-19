// import { useParams } from 'react-router-dom';
import MissionImage from '@/components/missionSubmit/MissionThumbnail';
import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/missionSubmit/SubmitBanner';
import PRLink from '@/components/missionSubmit/PRLink';
import OneWord from '@/components/missionSubmit/OneWord';
import SubmitButton from '@/components/missionSubmit/SubmitButton';
import SuccessMissionSubmitPopUp from '@/components/popUp/SuccessMissionSubmitPopUp';
import { useState } from 'react';

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

const Content = () => {
  return <div>컨텐츠입니다.</div>;
};

export default function MissionSubmitPage() {
  // const { id } = useParams();
  const { thumbnail, title, language } = MOCK_MISSION.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMissionSubmit = () => {
    // TODO 미션 제출 post 요청 @버건디
    setIsModalOpen(true);
  };

  return (
    <S.Container>
      <MissionImage thumbnail={thumbnail} title={title} language={language} />
      <SubmitBanner />
      <PRLink />
      <OneWord />
      <SubmitButton onSubmit={handleMissionSubmit} />
      <SuccessMissionSubmitPopUp isModalOpen={isModalOpen} />
    </S.Container>
  );
}
