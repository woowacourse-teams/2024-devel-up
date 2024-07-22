import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { createGlobalStyle } from 'styled-components';

interface PreventScrollObserverProps extends PropsWithChildren {
  isOpen?: boolean;
}

const GlobalStyle = createGlobalStyle`
  .no-scroll {
    overflow: hidden;
    height: 100%;
  }
`;

export default function ScrollPreventer({ isOpen = true, children }: PreventScrollObserverProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}
