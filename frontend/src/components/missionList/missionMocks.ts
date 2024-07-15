type LangugeOption = 'JAVA' | 'JAVASCRIPT';

export interface Mission {
  id: number;
  title: string;
  language: LangugeOption;
  description: string;
  thumbnail: string;
  url: string;
}

export const missionMocks: Mission[] = [
  {
    id: 1,
    title: '루터회관 흡연 단속',
    language: 'JAVA',
    description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
    thumbnail:
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/38a7f41b-80d7-48ca-97c9-99ceda5c4dbd/smoking.png?id=60756a7a-c50f-4946-ab6e-4177598b926b&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721174400000&signature=todzUdb5cUyzW4ZQNaHvL-uiCngfMJJAl94RpE1TGEA&downloadName=smoking.png',
    url: 'https://github.com/develup-mission/java-smoking',
  },
  {
    id: 2,
    title: '단어 퍼즐 게임',
    language: 'JAVA',
    description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
    thumbnail:
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/42c240fa-3581-44fe-9[…]cpHoVmGZllp93dwXqjY9XquWvtq74lJ4&downloadName=word-puzzle.png',
    url: 'https://github.com/develup-mission/java-word-puzzle',
  },
  {
    id: 3,
    title: '숫자 추리 게임',
    language: 'JAVA',
    description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
    thumbnail:
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/ced90f97-7878-4666-9[…]pvT-EKNbwLmCKM-2x5HdYYdN2yUk&downloadName=guessing-number.png',
    url: 'https://github.com/develup-mission/java-guessing-number',
  },
];
