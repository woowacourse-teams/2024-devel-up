import * as S from './PRLink.styled';
import Input from '../common/Input/Input';

export default function PRLink() {
  return (
    <S.Container>
      <S.Title>Github PR 링크</S.Title>
      <Input width="xlarge" placeholder="https://github.com/johndoe_dev/baseball-game/pull/1" />
    </S.Container>
  );
}
