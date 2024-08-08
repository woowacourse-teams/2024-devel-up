import styled from 'styled-components';
import useSolutionSummaries from '@/hooks/useSolutions';
import Card from '@/components/common/Card';

export default function SolutionListPage() {
  const { data: solutions } = useSolutionSummaries();

  return (
    <S.SolutionListPageContainer>
      <S.SolutionTitle>💡 Solutions</S.SolutionTitle>
      <S.SolutionList>
        {solutions.map(({ id, thumbnail, title, description }) => {
          return (
            <Card
              key={id}
              thumbnailSrc={thumbnail}
              thumbnailFallbackText="Solution"
              contentElement={
                <div>
                  <S.SolutionItemTitle>{title}</S.SolutionItemTitle>
                  <S.SolutionItemDescription>{description}</S.SolutionItemDescription>
                </div>
              }
            />
          );
        })}
      </S.SolutionList>
    </S.SolutionListPageContainer>
  );
}

const S = {
  SolutionTitle: styled.h2`
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
    font-size: 2.8rem;
    font-weight: bold;
  `,

  SolutionListPageContainer: styled.div`
    margin: 0 auto;
    width: fit-content;
  `,

  SolutionList: styled.div`
    display: flex;
    width: 100rem;
    justify-content: space-between;
    gap: 3.6rem;
    flex-wrap: wrap;
  `,

  SolutionItemTitle: styled.div`
    font-size: 1.6rem;
    font-weight: 600;
  `,

  SolutionItemDescription: styled.div`
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--grey-500);
    margin-top: 0.5rem;
  `,
};
