import Header from './components/header';
import { GlobalLayout } from './styles/GlobalLayout';

export default function App() {
  return (
    <GlobalLayout>
      <Header />
      <div>컨텐츠</div>
    </GlobalLayout>
  );
}
