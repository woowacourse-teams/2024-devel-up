import * as S from './SolutionSection.styled';
import type { Solution } from '@/types/solution';
import Button from '@/components/common/Button/Button';
import SolutionDetailHeader from './SolutionDetailHeader';
import { useSolutionDelete } from '@/hooks/useSolutionDelete';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface SolutionDetailProps {
  solution: Solution;
}

export default function SolutionSection({ solution }: SolutionDetailProps) {
  const { id: solutionId, description, url, mission } = solution;
  // 수정, 삭제 잘 되는지 dev에서 확인 필요합니다. @프룬
  const { solutionDeleteMutation } = useSolutionDelete();

  const navigate = useNavigate();
  const handleNavigateToModifySolution = () => {
    navigate(`${ROUTES.submitSolution}/${mission.id}?solutionId=${solutionId}`);
  };

  return (
    <section>
      <S.SolutionDetailTitle>📝 Solutions</S.SolutionDetailTitle>
      <SolutionDetailHeader solution={solution} />
      <S.CodeViewButtonWrapper>
        <S.CodeViewButtonLink to={url} target="_blank">
          <Button variant="default">
            <S.GithubIcon />
            코드 보러 가기
          </Button>
        </S.CodeViewButtonLink>
      </S.CodeViewButtonWrapper>
      <S.SolutionDescription>{description}</S.SolutionDescription>
      <S.SolutionDescriptionBottom>
        <Button variant="defaultText" onClick={() => handleNavigateToModifySolution()}>
          수정
        </Button>
        <Button variant="defaultText" onClick={() => solutionDeleteMutation(solutionId)}>
          삭제
        </Button>
      </S.SolutionDescriptionBottom>
    </section>
  );
}
