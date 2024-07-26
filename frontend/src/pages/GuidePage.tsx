import Tabs from '@/components/Tab/Tabs';
import type { TabInfo } from '@/types';
import HowToFork from '@/components/Guide/HowToFork';
import HowToReview from '@/components/Guide/HowToReview';
import HowToPR from '@/components/Guide/HowToPr';

//TODO 여기서만 쓰일 데이터 같아서 일단 위에 선언해놓습니다. @버건디

const TAB_LIST: TabInfo[] = [
  {
    name: 'step1(포크 클론 방법)',
    content: <HowToFork />,
  },
  {
    name: 'step2(PR 보내기 / 제출)',
    content: <HowToPR />,
  },
  {
    name: 'step3(리뷰 방법)',
    content: <HowToReview />,
  },
];

export default function GuidePage() {
  return (
    <Tabs tabList={TAB_LIST}>
      <Tabs.ListWrapper>
        {TAB_LIST.map((tab, index) => (
          <Tabs.TabHeader key={index} index={index}>
            {tab.name}
          </Tabs.TabHeader>
        ))}
      </Tabs.ListWrapper>
      <Tabs.CurrentContent />
    </Tabs>
  );
}
