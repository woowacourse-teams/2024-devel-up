type LanguageOption = 'JAVA' | 'JAVASCRIPT';

export interface Mission {
  id: number;
  title: string;
  language: LanguageOption;
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
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/42c240fa-3581-44fe-98ee-88f809996158/word-puzzle.png?id=7bd82f41-0c5b-4880-ac3f-265442c2e428&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721145600000&signature=UzH3S8xJFU43GXYKhvmmwp5wIrNE6Nss8vIRmbKO8N4&downloadName=word-puzzle.png',
    url: 'https://github.com/develup-mission/java-word-puzzle',
  },
  {
    id: 3,
    title: '숫자 추리 게임',
    language: 'JAVA',
    description: '루터회관 흡연 벌칙 프로그램을 구현한다.',
    thumbnail:
      'https://file.notion.so/f/f/d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48/ced90f97-7878-4666-96ce-0f39aca1a01e/guessing-number.png?id=c4fe206e-8aa2-4c5a-9895-1630030fc146&table=block&spaceId=d5a9d2d0-0fab-48ee-9e8a-13a13de1ac48&expirationTimestamp=1721145600000&signature=9lPNuetC73atEeb__y3f8ewS8wXvEQEMCfbFZhzYATo&downloadName=guessing-number.png',
    url: 'https://github.com/develup-mission/java-guessing-number',
  },
];
