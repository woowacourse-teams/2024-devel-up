import Header from './components/header';
import { GlobalLayout } from './styles/GlobalLayout';
import type { PropsWithChildren } from 'react';

export default function App({ children }: PropsWithChildren) {
  return (
    <GlobalLayout>
      <Header />
      {children}
    </GlobalLayout>
  );
}
