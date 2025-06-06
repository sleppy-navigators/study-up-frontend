import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { ReactNode } from 'react';
import * as Clipboard from 'expo-clipboard';

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
});

export function QueryProvider({ children }: QueryProviderProps) {
  const onCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);

      return true;
    } catch {
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <DevToolsBubble onCopy={onCopy} />
      )}
    </QueryClientProvider>
  );
}
