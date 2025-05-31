import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessageDto } from '@/domains/group/api/types';
import Constants from 'expo-constants';
import { authService } from '@/domains/auth/services/auth';

const WEBSOCKET_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_WEBSOCKET_URL as string || 'https://api.study-up.site'; // 기본값으로 제공해주신 URL 사용
const WEBSOCKET_ENDPOINT = '/ws'; // 백엔드 STOMP 엔드포인트
const WEBSOCKET_URL = `${WEBSOCKET_BASE_URL}${WEBSOCKET_ENDPOINT}`;

const CHAT_TOPIC_PREFIX = '/topic/group/';
const USER_ERROR_QUEUE = '/user/queue/errors'; // 사용자 특정 에러
const GENERAL_ERROR_TOPIC = '/topic/errors'; // 일반 에러

let stompClient: Client | null = null;

async function getAccessToken(): Promise<string | null> {
  try {
    const tokens = authService.getTokens();
    if (!tokens.accessToken) {
      console.warn('Access token is null from authService.');
    }
    return tokens.accessToken;
  } catch (error) {
    console.error('Failed to get access token from authService:', error);
    return null;
  }
}

export interface WebSocketConnectOptions {
  groupId: number;
  onMessageReceived: (message: ChatMessageDto) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any, errorMessage?: string) => void;
}

export const connectWebSocket = async ({
  groupId,
  onMessageReceived,
  onConnect,
  onDisconnect,
  onError,
}: WebSocketConnectOptions) => {
  if (stompClient && stompClient.active) {
    console.log('STOMP: Client is already active.');
    if (onConnect) onConnect();
    return;
  }

  const token = await getAccessToken();
  if (!token) {
    const noTokenMessage = 'STOMP: Access token is not available. Cannot connect.';
    console.error(noTokenMessage);
    if (onError) onError(new Error(noTokenMessage), noTokenMessage);
    return;
  }

  console.log(`STOMP: Attempting to connect to ${WEBSOCKET_URL} for group ${groupId}`);

  stompClient = new Client({
    webSocketFactory: () => {
      // SockJS는 전체 URL을 필요로 합니다.
      return new SockJS(WEBSOCKET_URL);
    },
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => {
      // console.log('STOMP Debug:', str); // 개발 중 필요시에만 활성화
    },
    reconnectDelay: 5000, // 5초마다 재연결 시도
    heartbeatIncoming: 10000, // 서버로부터 10초마다 하트비트 기대
    heartbeatOutgoing: 10000, // 서버로 10초마다 하트비트 전송
    onConnect: () => {
      console.log(`STOMP: Connected to ${WEBSOCKET_URL}`);

      // 그룹 채팅 메시지 구독
      stompClient?.subscribe(`${CHAT_TOPIC_PREFIX}${groupId}`, (message: IMessage) => {
        try {
          const parsedMessage: { data: ChatMessageDto } = JSON.parse(message.body);
          onMessageReceived(parsedMessage.data);
        } catch (e) {
          console.error('STOMP: Failed to parse group message:', e, message.body);
          if (onError) onError(e, 'Failed to parse incoming group message.');
        }
      });

      // 사용자 특정 에러 구독
      stompClient?.subscribe(USER_ERROR_QUEUE, (message: IMessage) => {
        console.error('STOMP: Received user-specific error:', message.body);
        if (onError) onError(message, `User error: ${message.body}`);
      });

      // 일반 에러 토픽 구독
      stompClient?.subscribe(GENERAL_ERROR_TOPIC, (message: IMessage) => {
        console.error('STOMP: Received general error:', message.body);
        if (onError) onError(message, `General error: ${message.body}`);
      });

      if (onConnect) onConnect();
    },
    onStompError: (frame) => {
      // STOMP 프로토콜 레벨 에러 (예: 인증 실패, 잘못된 토픽)
      const errorMessage = frame.headers['message'] || 'STOMP protocol error';
      console.error('STOMP: Protocol error:', errorMessage, frame.body);
      if (onError) onError(frame, errorMessage);
    },
    onWebSocketError: (event) => {
      // 기본 WebSocket 연결 에러 (네트워크 문제 등)
      console.error('STOMP: WebSocket connection error:', event);
      let detailErrorMessage = 'WebSocket connection error.';
      // SockJS는 에러 이벤트가 단순 문자열이거나 일반 Event 객체일 수 있음
      if (typeof event === 'string') {
         detailErrorMessage = event;
      } else if (event && typeof event === 'object' && 'message' in event && typeof event.message === 'string') {
         detailErrorMessage = event.message;
      }
      if (onError) onError(event, detailErrorMessage);
    },
    onDisconnect: () => {
      console.log('STOMP: Disconnected.');
      if (onDisconnect) onDisconnect();
    },
  });

  try {
    stompClient.activate();
  } catch (activationError) {
    console.error('STOMP: Activation error:', activationError);
    if (onError) onError(activationError, 'Failed to activate STOMP client.');
  }
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate();
    console.log('STOMP: Deactivated.');
  }
  stompClient = null; // 참조 제거
};
