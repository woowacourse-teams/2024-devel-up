import * as S from './SolutionDetail.styled';
import type { Solution } from '@/types/solution';
import Button from '@/components/common/Button/Button';
import SolutionDetailHeader from './SolutionDetailHeader';
import useUserInfo from '@/hooks/useUserInfo';
import SolutionDetailBottom from './SolutionDetailBottom';

interface SolutionDetailProps {
  solution: Solution;
}

export default function SolutionDetail({ solution }: SolutionDetailProps) {
  const { id: solutionId, description, url, mission } = solution;
  // 수정, 삭제 잘 되는지 dev에서 확인 필요합니다. @프룬

  const { data: userInfo } = useUserInfo();

  return (
    <div>
      <SolutionDetailHeader solution={solution} />
      <S.CodeViewButtonWrapper>
        <S.CodeViewButtonLink to={url + '/files'} target="_blank">
          <Button variant="default">
            <S.GithubIcon />
            코드 보러 가기
          </Button>
        </S.CodeViewButtonLink>
      </S.CodeViewButtonWrapper>
      <S.SolutionDescription source={description} />
      {userInfo?.id === solution.member.id && (
        <SolutionDetailBottom missionId={mission.id} solutionId={solutionId} />
      )}
    </div>
  );
}
