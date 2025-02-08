import { useSuspenseQuery } from '@tanstack/react-query';
import { Client } from '@stomp/stompjs';
import { useState, useCallback, useRef } from 'react';

type Message = {
  groupId: number;
  senderId: number | 'System';
  content: string;
  timestamp?: string;
  status: 'sending' | 'sent' | 'error';
};

async function initializeChat(
  baseUrl: string,
  groupId: number,
  userId: number,
  onMessageReceived: (message: Message) => void,
  onError: (error: any) => void
): Promise<Client> {
  const wsUrl = baseUrl.replace(/^http/, 'ws');
  console.log(baseUrl);
  console.log(wsUrl);

  const client = new Client({
    webSocketFactory: () => new globalThis.WebSocket(`${wsUrl}/ws`),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  await new Promise<void>((resolve, reject) => {
    client.onConnect = () => {
      onMessageReceived({
        senderId: 'System',
        content: '채팅방에 연결되었습니다.',
        status: 'sent',
        groupId,
      });
      resolve();
    };

    client.onStompError = (error) => {
      onError(error);
      reject(new Error(error.headers?.message || 'STOMP error'));
    };

    client.onWebSocketError = (event) => {
      console.error('WebSocket Error:', event);
      onError({ apiResult: 'WebSocket connection failed' });
    };

    client.activate();
  });

  // Subscribe to main chat topic
  client.subscribe(`/topic/group/${groupId}`, (message) => {
    try {
      const response = JSON.parse(message.body);
      onMessageReceived({
        ...response.data,
        status: 'sent',
      });
    } catch (_error) {
      console.error('Failed to parse message');
    }
  });

  // Subscribe to error topics
  client.subscribe('/user/queue/errors', (message) => {
    try {
      const response = JSON.parse(message.body);
      onError(response);
    } catch (_error) {
      console.error('Failed to parse error message');
    }
  });

  client.subscribe('/topic/errors', (message) => {
    try {
      const response = JSON.parse(message.body);
      onError(response);
    } catch (_error) {
      console.error('Failed to parse error message');
    }
  });

  return client;
}

export function useChatQuery(baseUrl: string, groupId: number, userId: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

  const { data: client } = useSuspenseQuery({
    queryKey: ['chat', groupId],
    queryFn: async () => {
      const client = await initializeChat(
        baseUrl,
        groupId,
        userId,
        (message) => {
          setMessages((prev) => [...prev, message]);
        },
        (error) => {
          setError(error?.apiResult || 'An error occurred');
          setMessages((prev) => [
            ...prev,
            {
              senderId: 'System',
              content: `Error: ${error?.apiResult || 'An error occurred'}`,
              status: 'error',
              groupId,
            },
          ]);
        }
      );
      clientRef.current = client;
      return client;
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (!client || !client.connected) {
        setError('Not connected to chat server');
        return;
      }

      const message: Message = {
        groupId,
        senderId: userId,
        content,
        timestamp: new Date().toISOString(),
        status: 'sending',
      };

      try {
        client.publish({
          destination: '/app/chat/message',
          body: JSON.stringify({
            groupId,
            senderId: userId,
            content,
          }),
        });

        setMessages((prev) => [...prev, message]);
      } catch (_error) {
        setMessages((prev) => [...prev, { ...message, status: 'error' }]);
        setError('Failed to send message');
      }
    },
    [client, groupId, userId]
  );

  const disconnect = useCallback(() => {
    if (client) {
      client.deactivate();
      setMessages((prev) => [
        ...prev,
        {
          senderId: 'System',
          content: '연결이 종료되었습니다.',
          status: 'sent',
          groupId,
        },
      ]);
    }
  }, [client, groupId]);

  const retryMessage = useCallback(
    (message: Message) => {
      if (!client || !client.connected) {
        setError('Not connected to chat server');
        return;
      }

      try {
        client.publish({
          destination: '/app/chat/message',
          body: JSON.stringify({
            groupId: message.groupId,
            senderId: message.senderId,
            content: message.content,
          }),
        });

        setMessages((prev) =>
          prev.map((m) =>
            m.timestamp === message.timestamp ? { ...m, status: 'sending' } : m
          )
        );
      } catch (_error) {
        setError('Failed to retry message');
      }
    },
    [client]
  );

  return {
    messages,
    isConnected: client?.connected ?? false,
    error,
    sendMessage,
    disconnect,
    retryMessage,
  };
}
