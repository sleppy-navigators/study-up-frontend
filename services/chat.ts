import { STOMP_TOPICS, WS_ENDPOINTS } from '@/constants/chat';
import {
  ConnectionStateType,
  ChatSubscriptionResponse,
  APIResponse,
} from '@/types/chat';
import {
  createChatMessage,
  createError,
  isValidGroupId,
  isValidMessage,
} from '@/utils/chat';
import { WebSocketService } from './websocket';

export class ChatService {
  private webSocketService: WebSocketService;
  private groupId: number | null = null;
  private userId: number | null = null;

  constructor(
    url: string,
    private onMessage: (message: ChatSubscriptionResponse) => void,
    private onConnectionChange: (state: ConnectionStateType) => void,
    private onError: (error: APIResponse<null>) => void,
    userId: number
  ) {
    this.userId = userId;
    this.webSocketService = new WebSocketService(
      url,
      this.handleConnectionChange,
      this.handleError
    );
  }

  public async connect(): Promise<void> {
    await this.webSocketService.connect();
  }

  public disconnect(): void {
    if (this.groupId) {
      this.leaveGroup();
    }
    this.webSocketService.disconnect();
  }

  public joinGroup(groupId: number): void {
    if (!isValidGroupId(groupId)) {
      this.handleError(createError('INVALID_GROUP', 'Invalid group ID'));
      return;
    }

    if (this.groupId && this.groupId !== groupId) {
      this.leaveGroup();
    }

    try {
      const topic = STOMP_TOPICS.GROUP(groupId);
      this.webSocketService.subscribe(topic, this.onMessage);
      this.groupId = groupId;
    } catch (error) {
      this.handleError(createError('JOIN_ERROR', (error as Error).message));
    }
  }

  public leaveGroup(): void {
    if (!this.groupId) return;

    const topic = STOMP_TOPICS.GROUP(this.groupId);
    this.webSocketService.unsubscribe(topic);
    this.groupId = null;
  }

  public sendMessage(content: string): void {
    if (!this.groupId) {
      this.handleError(createError('NO_GROUP', 'Not joined to any group'));
      return;
    }

    if (!this.userId) {
      this.handleError(createError('NO_USER', 'User ID not set'));
      return;
    }

    if (!isValidMessage(content)) {
      this.handleError(
        createError('INVALID_MESSAGE', 'Message cannot be empty')
      );
      return;
    }

    try {
      const message = createChatMessage(this.groupId, this.userId, content);
      this.webSocketService.send(WS_ENDPOINTS.SEND, message);
    } catch (error) {
      this.handleError(createError('SEND_ERROR', (error as Error).message));
    }
  }

  private handleConnectionChange = (state: ConnectionStateType): void => {
    this.onConnectionChange(state);
  };

  private handleError = (error: APIResponse<null>): void => {
    this.onError(error);
  };
}
