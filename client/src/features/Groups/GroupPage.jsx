import { Button, Container, Stack, Title } from '@mantine/core';
import { openGroupModal } from '../../utils/navLinkHandlers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import GroupSelect from './GroupSelect';
import styles from './GroupPage.module.css';
import { crudOperations } from '../../utils/helpers';
import CustomLoader from '../../ui/CustomLoader';

function GroupPage() {
  const queryClient = useQueryClient();
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
  });
  
  return (
    <>
      <Container>
        <Title
          order={1}
          align="center"
          mt="md"
          mb="lg"
          className={styles.title}
        >
          Your Groups
        </Title>
        <div className={styles.centerStack}>
          <Stack spacing="sm" mb="lg">
            <GroupSelect />
            <Button onClick={() => openGroupModal(queryClient)} size="sm">
              Create a Group
            </Button>
          </Stack>
        </div>
        <Stack></Stack>
      </Container>
    </>
  );
}

export default GroupPage;
