import type { Meta, StoryObj } from '@storybook/react';
import ky from 'ky';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

function MockApiDemo() {
  const [users, setUsers] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ky.get('https://api.example.com/users')
      .json()
      .then((data) => {
        setUsers(data.users);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text style={{ color: 'red' }}>Error: {error}</Text>;
  if (!users) return <Text>No users found.</Text>;
  return (
    <View>
      <Text>Fetched users from mock API:</Text>
      {users.map((user) => (
        <Text key={user}>{user}</Text>
      ))}
    </View>
  );
}

const meta = {
  title: 'Base/Mock API Demo',
  component: MockApiDemo,
} satisfies Meta<typeof MockApiDemo>;
export default meta;

type Story = StoryObj<typeof MockApiDemo>;

export const Default: Story = {
  args: {},
};
