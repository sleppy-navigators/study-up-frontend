import { z } from 'zod';

export const ConnectionState = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  ERROR: 'ERROR',
} as const;

export type ConnectionStateType =
  (typeof ConnectionState)[keyof typeof ConnectionState];

export const ChatMessageRequestSchema = z.object({
  groupId: z.number(),
  senderId: z.number(),
  content: z.string().min(1),
});

export const ChatSubscriptionResponseSchema = z.object({
  groupId: z.number(),
  senderId: z.union([z.number(), z.literal('System')]),
  content: z.string(),
  timestamp: z.string().datetime(),
});

export const createAPIResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    apiResult: z.string(),
  });

export type ChatMessageRequest = z.infer<typeof ChatMessageRequestSchema>;
export type ChatSubscriptionResponse = z.infer<
  typeof ChatSubscriptionResponseSchema
>;
export type APIResponse<T> = z.infer<
  ReturnType<typeof createAPIResponseSchema<z.ZodType<T>>>
>;
export type ChatSubscriptionAPIResponse = APIResponse<ChatSubscriptionResponse>;

export interface WebSocketHookState {
  connectionState: ConnectionStateType;
  error: APIResponse<null> | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: ChatMessageRequest) => void;
}

export interface ChatHookState {
  messages: ChatSubscriptionResponse[];
  isLoading: boolean;
  error: APIResponse<null> | null;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}
