import styled from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button';
import { BUTTON_SIZE, BUTTON_VARIANTS } from '@/constants/variants';

interface CommonButtonProps {
  $size: ButtonSize;
  $variant: ButtonVariant;
}

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
      return `background-color: var(--primary-500);
              color: var(--white-color);
                &:hover {
                  background-color: var(--primary-600);
                }
            `;

    default:
      return `background-color: var(--grey-200);
              color: var(--black-color);
                &:hover {
                  background-color: var(--grey-300);
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
