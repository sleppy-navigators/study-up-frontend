import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useChatQuery } from '@/hooks/useChatQuery';

type ChatProps = {
  groupId: number;
  userId: number;
  url: string;
  onSendMessage?: (content: string) => void;
};

export function Chat({ groupId, userId, url, onSendMessage }: ChatProps) {
  const { messages, isConnected, error, sendMessage, retryMessage } =
    useChatQuery(url, groupId, userId);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = useCallback(() => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
      onSendMessage?.(inputMessage.trim());
    }
  }, [inputMessage, sendMessage, onSendMessage]);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.statusText}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
      <View style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.timestamp}
            style={[
              styles.messageRow,
              msg.senderId === userId ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>
              {msg.senderId === userId ? 'You' : `User-${msg.senderId}`}:{' '}
              {msg.content}
            </Text>
            {msg.status === 'sending' && (
              <ActivityIndicator size="small" style={styles.messageStatus} />
            )}
            {msg.status === 'error' && (
              <TouchableOpacity
                onPress={() => retryMessage(msg)}
                style={styles.retryButton}>
                <Text style={styles.retryText}>⟲</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!isConnected || !inputMessage.trim()) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!isConnected || !inputMessage.trim()}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  errorText: {
    color: 'red',
    paddingVertical: 8,
  },
  statusText: {
    marginBottom: 8,
  },
  messagesContainer: {
    flex: 1,
    gap: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageText: {
    fontSize: 16,
    flex: 1,
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageStatus: {
    width: 20,
    height: 20,
  },
  retryButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    fontSize: 16,
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
