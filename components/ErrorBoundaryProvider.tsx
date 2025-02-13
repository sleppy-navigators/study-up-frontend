import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { useHandleReset } from '@/hooks/useHandleReset';
import { ReactNode } from 'react';

interface ErrorBoundaryProviderProps {
  children: ReactNode;
}

export const ErrorBoundaryProvider = ({
  children,
}: ErrorBoundaryProviderProps) => {
  const handleReset = useHandleReset();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};
