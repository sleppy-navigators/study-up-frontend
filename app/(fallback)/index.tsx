import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View>
      <Link href="/login">
        <Text>Login</Text>
      </Link>
      {/*<Link href="/chat">Chat</Link>
      <Link href="/bounty">Bounty</Link>
      <Link href="/group">Group</Link>
      <Link href="/group/create">Group Create</Link> */}
    </View>
  );
}
