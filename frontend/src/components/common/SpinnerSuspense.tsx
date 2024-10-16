import { Suspense, type PropsWithChildren } from 'react';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

export default function SpinnerSuspense({ children }: PropsWithChildren) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
