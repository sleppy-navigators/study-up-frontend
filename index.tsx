import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>Home safadfs</Text>
      <Text style={styles.text}>Home safadfs</Text>
      <Text style={styles.text}>Home safadfs</Text>
      <Link href="/about">
        <Text style={styles.button}>About</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});
