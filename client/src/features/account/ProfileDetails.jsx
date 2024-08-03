import { Card, Text } from '@mantine/core';
import styles from './ProfileDetails.module.css';

function ProfileDetails({ user }) {
  return (
    <Card padding="lg" radius="md" className={styles.card}>
      <Text size="lg" weight={500}>Name: {user.username}</Text>
      <Text size="lg" weight={500}>Email: {user.email}</Text>
      {/* Add more user details as needed */}
    </Card>
  );
}

export default ProfileDetails;
