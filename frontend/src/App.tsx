import Header from './components/Header';
import { GlobalLayout } from './styles/GlobalLayout';
import type { PropsWithChildren } from 'react';
import Footer from './components/Footer';

export default function App({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalLayout>
        <Header />
        {children}
      </GlobalLayout>
      <Footer />
    </>
  );
}
