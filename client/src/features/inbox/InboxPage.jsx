import { Title } from '@mantine/core';
import styles from './InboxPage.module.css';

function InboxPage() {
  return (
    <Title order={1} align="center" mt="md" mb="lg" className={styles.title}>
      Inbox
    </Title>
  );
}

export default InboxPage;
