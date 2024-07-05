import { Title } from '@mantine/core';
import styles from './InboxPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { crudOperations } from '../../utils/helpers';
import CustomLoader from '../../ui/CustomLoader';

function InboxPage() {
  const { data: invites, isPending } = useQuery({
    queryKey: ['invites'],
    queryFn: () => crudOperations('users', 'getInvites', 'GET'),
  });
  if (isPending) return <CustomLoader />;
  return (
    <Title order={1} align="center" mt="md" mb="lg" className={styles.title}>
      Inbox
    </Title>
  );
}

export default InboxPage;