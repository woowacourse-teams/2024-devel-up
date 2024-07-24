import * as S from './MissionDetail.styled';

interface MissionDetailContentProps {
  descriptionUrl: string;
}

export default function MissionDetailContent({ descriptionUrl }: MissionDetailContentProps) {
  descriptionUrl; // 추후 markdown 구현 @프룬
  return (
    <S.MissionDescription>
      <p>
        진행 방식
        <br />
        <br />
        미션 진행은 미션 진행 가이드 문서를 따른다.
        <br />
        리뷰 진행은 리뷰 진행 가이드 문서를 따른다.
        <br />
        <br />
        기능 요구 사항
        <br />
        <br />
        루터회관 흡연 벌칙 프로그램을 구현한다.
        <br />
        <br />
        사용자는 어떤 벌칙을 수행할 것인지를 입력할 수 있어야한다.
        <br />
        벌칙 목록은 다음과 같다.
        <br />
        벌칙 시작일 기준 1년안에 10만원을 납부한다.
        <br />
        벌칙 시작일 기준 30일안에 벌금을 납부하면 8만원이다.
        <br />
        온라인 교육 프로그램을 이수하면 5만원을 부담한다.
        <br />
        가까운 보건소에서 금연 프로그램을 이수하면 벌금은 면제된다.
        <br />
        사용자가 잘못된 값을 입력할 경우 IlegalArgumentException을 발생시킨 후 프로그램은 종료되어야
        한다.
        <br />
        <br />
        예시
        <br />
        <br />
        어떤 벌칙을 수행할지 입력해주세요.
        <br />
        1. 10만원 납부
        <br />
        2. 한달 내에 8만원 납부
        <br />
        3. 온라인 교육 프로그램 이수 후 5만원 납부
        <br />
        4. 금연 프로그램 이수 후 벌금 면제
        <br />
        <br />
        <br />
        벌칙 요약입니다.
        <br />
        <br />
        납부금 : 80,000원
        <br />
        납부 기한 : 2024-08-15
        <br />
        이수 예정 프로그램 : 없음
        <br />
        <br />
        프로그램을 종료합니다.
      </p>
    </S.MissionDescription>
  );
}
