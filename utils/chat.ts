import {
  ChatMessageRequest,
  ChatSubscriptionResponse,
  APIResponse,
} from '@/types/chat';
import { ERROR_MESSAGES } from '@/constants/chat';

export const formatTimestamp = (date: Date): string => {
  return date.toISOString();
};

export const createChatMessage = (
  groupId: number,
  senderId: number,
  content: string
): ChatMessageRequest => {
  return {
    groupId,
    senderId,
    content: content.trim(),
  };
};

export const formatChatResponse = (
  message: ChatSubscriptionResponse
): ChatSubscriptionResponse => {
  return {
    ...message,
    content: message.content.trim(),
  };
};

export const createError = (
  code: string,
  message: string
): APIResponse<null> => {
  return {
    data: null,
    apiResult: `${code}: ${message}`,
  };
};

export const isSystemMessage = (senderId: number | 'System'): boolean => {
  return senderId === 'System';
};

export const isValidGroupId = (groupId: unknown): groupId is number => {
  return typeof groupId === 'number' && groupId > 0;
};

export const isValidMessage = (content: string): boolean => {
  return content.trim().length > 0;
};

export const getConnectionErrorMessage = (retryCount: number): string => {
  return `${ERROR_MESSAGES.CONNECTION_FAILED} (Attempt ${retryCount})`;
};

export const getSubscriptionErrorMessage = (groupId: number): string => {
  return `${ERROR_MESSAGES.SUBSCRIPTION_FAILED} for group ${groupId}`;
};
