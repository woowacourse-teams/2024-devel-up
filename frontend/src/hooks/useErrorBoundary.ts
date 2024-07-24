import { useContext, useMemo, useState } from 'react';
import { ErrorBoundaryContext } from '@/contexts/ErrorBoundaryContext';
import type { ErrorBoundaryContextType } from '@/contexts/ErrorBoundaryContext';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function assertErrorBoundaryContext(value: any): asserts value is ErrorBoundaryContextType {
  if (
    value == null ||
    typeof value.didCatch !== 'boolean' ||
    typeof value.resetErrorBoundary !== 'function'
  ) {
    throw new Error('ErrorBoundaryContext not found');
  }
}

type UseErrorBoundaryState<TError> =
  | { error: TError; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

export function useErrorBoundary<TError = any>(): UseErrorBoundaryApi<TError> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const [state, setState] = useState<UseErrorBoundaryState<TError>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        context.resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: TError) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [context.resetErrorBoundary],
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
