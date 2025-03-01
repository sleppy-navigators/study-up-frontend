import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  return (
    <View>
      <Link href="/login">Login</Link>
      <Link href="/chat">Chat</Link>
      <Link href="/bounty">Bounty</Link>
    </View>
  );
}
