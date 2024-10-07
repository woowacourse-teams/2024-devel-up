import * as S from './SolutionSection.styled';
import type { Solution } from '@/types/solution';
import Button from '@/components/common/Button/Button';
import SolutionDetailHeader from './SolutionDetailHeader';
import { useSolutionDelete } from '@/hooks/useSolutionDelete';

interface SolutionDetailProps {
  solution: Solution;
}

export default function SolutionSection({ solution }: SolutionDetailProps) {
  const { description, url } = solution;
  const { solutionDeleteMutation } = useSolutionDelete();

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
        <Button variant="defaultText">수정</Button>
        <Button variant="defaultText" onClick={() => solutionDeleteMutation(solution.id)}>
          삭제
        </Button>
      </S.SolutionDescriptionBottom>
    </section>
  );
}
