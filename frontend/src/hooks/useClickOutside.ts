import { router } from '@/index';
import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends Node = HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // 이벤트 버블링에 의해 모달이 렌더되는 즉시 callback이 호출되는 것을 방지하기 위해 setTimeout 사용 (추후 리팩토링 예정) @라이언
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  // react-router-dom Link 클릭 시 클릭 이벤트가 감지되지 않는 문제를 해결하기 위함 @라이언
  router.subscribe(callback);

  return { targetRef: ref };
};
