import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button';
import { BUTTON_SIZE, BUTTON_VARIANTS } from '@/constants/variants';

interface CommonButtonProps {
  $size: ButtonSize;
  $variant: ButtonVariant;
}

// TODO: 객체 형태로 바꾸기 @프룬
const buttonSize = (size: ButtonSize) => {
  switch (size) {
    case BUTTON_SIZE.half:
      return '27.1rem';

    case BUTTON_SIZE.full:
      return '100%';

    default:
      return 'fit-content';
  }
};

const color = (variant: ButtonVariant) => {
  switch (variant) {
    case BUTTON_VARIANTS.primary:
      return css`
        background-color: ${(props) => props.theme.colors.primary500};
        color: ${(props) => props.theme.colors.whiteColor};
        &:hover {
          background-color: ${(props) => props.theme.colors.primary600};
        }
      `;

    default:
      return css`
        background-color: ${(props) => props.theme.colors.grey200};
        color: ${(props) => props.theme.colors.blackColor};
        &:hover {
          background-color: ${(props) => props.theme.colors.grey300};
        }
      `;
  }
};

export const CommonButton = styled.button<CommonButtonProps>`
  ${(props) => color(props.$variant)}

  width: ${(props) => buttonSize(props.$size)};
  min-height: 4.2rem;
  padding: 1rem 1.4rem;
  border-radius: 0.8rem;

  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: inherit;

  &:disabled {
    cursor: default;
  }
`;
