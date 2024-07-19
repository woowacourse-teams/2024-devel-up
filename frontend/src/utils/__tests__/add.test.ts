import add from '../add';

// 프론트 ci 환경 구축을 위한 임시 테스트 코드입니다.
// 후에 도메인 로직에 대한 테스트 코드 작성이 된다면 지워도 괜찮습니다.
describe('ci 구축을 위한 테스트 코드 작성 ', () => {
  it('ci 환경 구축을 위한 작성한다.', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});
