import { Client, Frame, Message } from '@stomp/stompjs';
import { WS_CONFIG } from '@/constants/chat';
import {
  ChatMessageRequest,
  ConnectionState,
  ConnectionStateType,
  ChatSubscriptionResponse,
  ChatSubscriptionAPIResponse,
  APIResponse,
} from '@/types/chat';
import { createError, getConnectionErrorMessage } from '@/utils/chat';

export class WebSocketService {
  private client: Client | null = null;
  private retryCount = 0;
  private subscriptions = new Map<
    string,
    { id: string; callback: (data: ChatSubscriptionResponse) => void }
  >();

  constructor(
    private url: string,
    private onConnectionChange: (state: ConnectionStateType) => void,
    private onError: (error: APIResponse<null>) => void
  ) {}

  public async connect(): Promise<void> {
    if (this.client?.connected) return;

    this.onConnectionChange(ConnectionState.CONNECTING);

    try {
      this.client = new Client({
        brokerURL: this.url,
        connectHeaders: {},
        debug: (str) => {
          console.debug(str);
        },
        reconnectDelay: WS_CONFIG.RECONNECT_DELAY,
        heartbeatIncoming: WS_CONFIG.HEARTBEAT_INCOMING,
        heartbeatOutgoing: WS_CONFIG.HEARTBEAT_OUTGOING,
        onConnect: this.handleConnect,
        onDisconnect: this.handleDisconnect,
        onStompError: this.handleStompError,
        onWebSocketClose: this.handleWebSocketClose,
      });

      await this.client.activate();
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  public disconnect(): void {
    if (!this.client?.connected) return;

    this.client.deactivate();
    this.subscriptions.clear();
    this.onConnectionChange(ConnectionState.DISCONNECTED);
  }

  public subscribe(
    topic: string,
    callback: (data: ChatSubscriptionResponse) => void
  ): void {
    if (!this.client?.connected) {
      throw new Error('Not connected to WebSocket server');
    }

    if (this.subscriptions.has(topic)) {
      return;
    }

    const subscription = this.client.subscribe(topic, (message: Message) => {
      try {
        const response = JSON.parse(
          message.body
        ) as ChatSubscriptionAPIResponse;
        callback(response.data);
      } catch (error) {
        this.handleError(error as Error);
      }
    });

    this.subscriptions.set(topic, {
      id: subscription.id,
      callback,
    });
  }

  public unsubscribe(topic: string): void {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      this.client?.unsubscribe(subscription.id);
      this.subscriptions.delete(topic);
    }
  }

  public send(destination: string, message: ChatMessageRequest): void {
    if (!this.client?.connected) {
      throw new Error('Not connected to WebSocket server');
    }

    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }

  private handleConnect = (frame: Frame): void => {
    this.retryCount = 0;
    this.onConnectionChange(ConnectionState.CONNECTED);
  };

  private handleDisconnect = (frame: Frame): void => {
    this.onConnectionChange(ConnectionState.DISCONNECTED);
  };

  private handleStompError = (frame: Frame): void => {
    const error = createError(
      'STOMP_ERROR',
      frame.body || 'Unknown STOMP error'
    );
    this.onError(error);
  };

  private handleWebSocketClose = (): void => {
    if (this.retryCount < WS_CONFIG.MAX_RETRIES) {
      this.retryCount++;
      this.onError(
        createError('WS_CLOSE', getConnectionErrorMessage(this.retryCount))
      );
      this.connect();
    } else {
      this.onError(
        createError('WS_MAX_RETRIES', 'Maximum reconnection attempts reached')
      );
      this.onConnectionChange(ConnectionState.ERROR);
    }
  };

  private handleError = (error: Error): void => {
    this.onError(createError('WS_ERROR', error.message));
    this.onConnectionChange(ConnectionState.ERROR);
  };
}
