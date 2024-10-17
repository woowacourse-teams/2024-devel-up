import { styled } from 'styled-components';
import javaIcon from '@/assets/images/java.svg';

//TODO shadow에 대한 스타일 변수 적용해야합니다. @버건디
export const MissionImageContainer = styled.div`
  margin: 2rem 0;
`;

export const MissionImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40rem;
  border: 1px solid ${(props) => props.theme.colors.grey200};
  filter: drop-shadow(${(props) => props.theme.boxShadow.shadow04});
  margin: 0 auto;
  border-radius: 1rem;
`;

export const MissionImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 27rem;
`;

export const MissionSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${(props) => props.theme.colors.grey50};
  border-radius: 0 0 1rem 1rem;
`;

export const MissionSummaryText = styled.h2`
  ${(props) => props.theme.font.bodyBold}
`;

export const JavaIcon = styled(javaIcon)``;
