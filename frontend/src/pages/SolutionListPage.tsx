import styled from 'styled-components';
import useSolutions from "@/hooks/useSolutions";
import Card from "@/components/common/Card";

export default function SolutionListPage() {
    const {data: solutions} = useSolutions();

    return (
        <S.SolutionListContainer>
            {
                solutions.map(({
                                   id,
                                   thumbnail,
                                   title,
                        description

                               }) => {
                    return <Card key={id} thumbnailSrc={thumbnail} thumbnailFallbackText="Solution"
                                 contentElement={<div>
                                     <div>{title}</div>
                                     <div>{description}</div>
                                 </div>}/>
                })
            }
        </S.SolutionListContainer>
    );
}

const S = {
    SolutionListContainer: styled.div`
      display: flex;
      gap: 4rem;
      flex-wrap: wrap;
    `
}
