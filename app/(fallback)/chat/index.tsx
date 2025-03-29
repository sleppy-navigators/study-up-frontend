import React, { Suspense } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Chat as ChatComponent } from '@/components/Chat';

const ChatContent = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <ChatComponent
        groupId={1}
        userId={1}
        url={process.env.EXPO_PUBLIC_WEBSOCKET_URL!}
      /> */}
    </View>
  );
};

export default function ChatScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 10 }}>Connecting to chat...</Text>
          </View>
        }>
        <ChatContent />
      </Suspense>
    </View>
  );
}
