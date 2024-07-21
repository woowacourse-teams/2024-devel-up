import MissionItem from '@/components/MissionList/MissionItem';
import * as S from '@/components/MissionList/MissionList.styled';
import { missionMocks } from '@/components/MissionList/missionMocks';
import Carousel from '@/components/Carousel/Carousel';

export default function MissionListPage() {
  return (
    <S.MissionListContainer>
      <S.MissionListTitle>미션 풀고 리뷰 받고, Devel Up!</S.MissionListTitle>
      <Carousel>
        {/**
         * 캐러셀 테스트 용으로 만들어본 이미지들입니다. 추후 수정 예정
         */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
            width={'100%'}
            height={'100%'}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            height: '100%',
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
            width={'100%'}
            height={'100%'}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png"
            width={'100%'}
            height={'100%'}
          />
        </div>
      </Carousel>
      <S.MissionList>
        {missionMocks.map((mission) => (
          <MissionItem key={mission.id} mission={mission} />
        ))}
      </S.MissionList>
    </S.MissionListContainer>
  );
}
