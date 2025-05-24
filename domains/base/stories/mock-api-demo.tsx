import { useEffect, useState } from 'react';

// Simple component that fetches from the mock API and displays the result
export default function MockApiDemo() {
  const [users, setUsers] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.example.com/users')
      .then(async (res) => {
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        setUsers(data.users);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!users) return <div>No users found.</div>;
  return (
    <div>
      <div>Fetched users from mock API:</div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
