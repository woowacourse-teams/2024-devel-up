import * as S from './Footer.styled';

export default function Footer() {
  return (
    <S.Container>
      <S.TextWrapper>
        <S.Text>DevelUp</S.Text>
        <S.LinkTextWrapper>
          <S.LinkText
            href="https://docs.google.com/forms/d/e/1FAIpQLSfkgaVvmFSrrQ3TSO0qL00ZE98jog_eXK-zrUXtvBulO--dkA/viewform"
            target={'_blank'}
          >
            데벨업에게 피드백 하기
          </S.LinkText>
          <S.LinkText href="https://velog.io/@teamdevelup/posts" target={'_blank'}>
            개발 이야기
          </S.LinkText>
        </S.LinkTextWrapper>
      </S.TextWrapper>
    </S.Container>
  );
}
