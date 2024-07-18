import Tabs from '@/components/tab/Tabs';
import HowToFork from '@/components/guide/HowToFork';
import { TabData } from '@/types';

//TODO 여기서만 쓰일 데이터 같아서 일단 위에 선언해놓습니다. @버건디

const TAB_LIST: TabData[] = [
  {
    name: 'step1(포크 클론 방법)',
    content: <HowToFork />,
  },
  {
    name: 'step2(PR 보내기 / 제출)',
    content: <div>step2(PR 보내기 / 제출)</div>,
  },
  {
    name: 'step3(리뷰 방법)',
    content: <div>step3(리뷰방법)</div>,
  },
];

export default function GuidePage() {
  return (
    <Tabs tabList={TAB_LIST}>
      <Tabs.List>
        {TAB_LIST.map((tab, index) => (
          <Tabs.Tab key={index} index={index}>
            {tab.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.CurrentTab />
    </Tabs>
  );
}
