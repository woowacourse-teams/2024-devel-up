import Header from './components/Header';
import { GlobalLayout } from './styles/GlobalLayout';
import type { PropsWithChildren } from 'react';
import Footer from './components/Footer';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';

export default function App({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalLayout>
        <Header />
        {children}
      </GlobalLayout>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
