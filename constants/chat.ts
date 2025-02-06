export const WS_ENDPOINTS = {
  SUBSCRIBE: '/docs/chat/subscribe',
  SEND: '/docs/chat/send',
  ERROR: '/docs/chat/error',
  CONNECTION: '/docs/chat/connection',
} as const;

export const STOMP_TOPICS = {
  GROUP: (groupId: number) => `/topic/group/${groupId}`,
} as const;

export const WS_CONFIG = {
  RECONNECT_DELAY: 5000,
  MAX_RETRIES: 3,
  HEARTBEAT_INCOMING: 4000,
  HEARTBEAT_OUTGOING: 4000,
} as const;

export const ERROR_MESSAGES = {
  CONNECTION_FAILED: 'Failed to connect to chat server',
  MESSAGE_SEND_FAILED: 'Failed to send message',
  INVALID_MESSAGE: 'Invalid message format',
  SUBSCRIPTION_FAILED: 'Failed to subscribe to topic',
  DISCONNECTED: 'Disconnected from chat server',
} as const;
