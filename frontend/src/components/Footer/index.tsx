import * as S from './Footer.styled';

export default function Footer() {
  return (
    <S.Container>
      <S.TextWrapper>
        <S.Text>DevelUp</S.Text>
        <S.LinkTextWrapper>
          <S.EmailText>develupteam@gmail.com</S.EmailText>
          <S.LinkText href="https://velog.io/@teamdevelup/posts" target={'_blank'}>
            개발 이야기
          </S.LinkText>
        </S.LinkTextWrapper>
      </S.TextWrapper>
    </S.Container>
  );
}
