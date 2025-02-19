import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { ReactNode } from 'react';
import * as Clipboard from 'expo-clipboard';

interface QueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 3,
        refetchOnReconnect: true,
      },
    },
  });

  const onCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);

      return true;
    } catch {
      return false;
    }
  };

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <DevToolsBubble onCopy={onCopy} />
      )}
    </TanstackQueryClientProvider>
  );
}
