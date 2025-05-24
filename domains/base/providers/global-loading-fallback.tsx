import React, { ReactNode, Suspense } from 'react';
import { LoadingSpinner } from '../components/loading-spinner';

interface GlobalLoadingFallbackProps {
  children: ReactNode;
}

export default function GlobalLoadingFallback({
  children,
}: GlobalLoadingFallbackProps) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
