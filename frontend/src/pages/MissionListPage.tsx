import MissionItem from '@/components/MissionList/MissionItem';
import * as S from '@/components/MissionList/MissionList.styled';
import Carousel from '@/components/Carousel/Carousel';
import useMissions from '@/hooks/useMissions';
import getPlaceholderImg from '@/components/common/Card/getPlaceholderImg';
import useUserInfo from '@/hooks/useUserInfo';
import SubmissionInProgress from '@/components/Submission/SubmissionInProgress';

export default function MissionListPage() {
  const { data: allMissions } = useMissions();
  const { data: userInfo } = useUserInfo();

  return (
    <S.MissionListContainer>
      <Carousel autoPlay={true} autoSpeed={5000}>
        <img src={getPlaceholderImg(1000, 425, 'devel-up banner 1')} />
        <img src={getPlaceholderImg(1000, 425, 'devel-up banner 2')} />
        <img src={getPlaceholderImg(1000, 425, 'devel-up banner 3')} />
      </Carousel>
      {userInfo && <SubmissionInProgress />}

      <div>
        <S.MissionListTitle>새로운 미션에 참여해 보세요!</S.MissionListTitle>
        <S.MissionList>
          {allMissions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} />
          ))}
        </S.MissionList>
      </div>
    </S.MissionListContainer>
  );
}
