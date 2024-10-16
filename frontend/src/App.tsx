import Header from './components/Header';
import { GlobalLayout } from './styles/GlobalLayout';
import type { PropsWithChildren } from 'react';
import Footer from './components/Footer';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import * as S from './App.styled';

export default function App({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <GlobalLayout>
        <S.SkipTag href="#main-content" className="visually-hidden">
          본문으로 바로가기
        </S.SkipTag>
        <Header />
        <main id="main-content">{children}</main>
      </GlobalLayout>
      <Footer />
      <ScrollToTopButton />
    </S.Container>
  );
}
