import { useLocation } from 'react-router-dom';

const PATH_SEPARATOR = '/';
// @note(ryan): split할 경우 첫 요소로 빈 문자열이 생기므로 index에 1을 더해줍니다. 단, 음수 값에는 더하지 않습니다.
const INDEX_ADJUSTMENT = 1;

const usePathnameAt = (pathnameIndex: number): string | undefined => {
  const location = useLocation();

  const pathnames = location.pathname.split(PATH_SEPARATOR);

  const isNegativeIndex = pathnameIndex < 0;
  const targetIndex = isNegativeIndex ? pathnameIndex : pathnameIndex + INDEX_ADJUSTMENT;

  return pathnames.at(targetIndex);
};

export default usePathnameAt;
