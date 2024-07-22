import { useEffect } from 'react';

interface ListenKeyDownProps {
  targetKey: string;
  onKeyDown: () => void;
}

export default function ListenKeyDown({ targetKey, onKeyDown }: ListenKeyDownProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        onKeyDown();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
