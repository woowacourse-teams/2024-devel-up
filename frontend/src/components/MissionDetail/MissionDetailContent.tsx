import * as S from './MissionDetail.styled';

interface MissionDetailContentProps {
  descriptionUrl: string;
}

export default function MissionDetailContent({ descriptionUrl }: MissionDetailContentProps) {
  descriptionUrl; // 추후 markdown 구현 @프룬
  return (
    <S.MissionDescription>
      <S.MissionDescriptionText>진행 방식</S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>
        미션 진행은 미션 진행 가이드 문서를 따른다.
      </S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>
        리뷰 진행은 리뷰 진행 가이드 문서를 따른다.
      </S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>기능 요구 사항</S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>루터회관 흡연 벌칙 프로그램을 구현한다.</S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>
        사용자는 어떤 벌칙을 수행할 것인지를 입력할 수 있어야한다.
      </S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>벌칙 목록은 다음과 같다.</S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>
        벌칙 시작일 기준 1년안에 10만원을 납부한다.
      </S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>
        벌칙 시작일 기준 30일안에 벌금을 납부하면 8만원이다.
      </S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>
        온라인 교육 프로그램을 이수하면 5만원을 부담한다.
      </S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>
        가까운 보건소에서 금연 프로그램을 이수하면 벌금은 면제된다.
      </S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>
        사용자가 잘못된 값을 입력할 경우 IlegalArgumentException을 발생시킨 후 프로그램은 종료되어야
        한다.
      </S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>예시</S.MissionDescriptionText>
      <br />
      <br />
      <S.MissionDescriptionText>어떤 벌칙을 수행할지 입력해주세요.</S.MissionDescriptionText>
      <br />
      <S.MissionDescriptionText>1. 10만원 납부</S.MissionDescriptionText>

      <br />
      <S.MissionDescriptionText>2. 한달 내에 8만원 납부</S.MissionDescriptionText>

      <br />
      <S.MissionDescriptionText>
        3. 온라인 교육 프로그램 이수 후 5만원 납부
      </S.MissionDescriptionText>

      <br />
      <S.MissionDescriptionText>4. 금연 프로그램 이수 후 벌금 면제</S.MissionDescriptionText>

      <br />
      <br />
      <br />
      <S.MissionDescriptionText>벌칙 요약입니다.</S.MissionDescriptionText>

      <br />
      <br />
      <S.MissionDescriptionText>납부금 : 80,000원</S.MissionDescriptionText>

      <br />
      <S.MissionDescriptionText>납부 기한 : 2024-08-15</S.MissionDescriptionText>

      <br />
      <S.MissionDescriptionText>이수 예정 프로그램 : 없음</S.MissionDescriptionText>

      <br />
      <br />
      <S.MissionDescriptionText>프로그램을 종료합니다.</S.MissionDescriptionText>
    </S.MissionDescription>
  );
}
