import { Container, Stack, Title } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './GroupPage.module.css';
import { crudOperations } from '../../utils/helpers';
import GroupOptions from './GroupOptions';
import CustomLoader from '../../ui/CustomLoader';
import GroupItem from './GroupItem';

function GroupPage() {
  const queryClient = useQueryClient();
  const { data: groups, isPending } = useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
  });
  if (isPending) return <CustomLoader />;

  const groupNames = groups?.map((group) => group.name);

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
        <GroupOptions
          queryClient={queryClient}
          styles={styles}
          groupNames={groupNames}
        />
        {groups.length === 0 ? (
          <h3 className={styles.noGroups}>
            No groups yet, click on &quot;Create a Group&quot; to get started!
          </h3>
        ) : (
          <Stack>
            {groups.map((group, i) => (
              <GroupItem key={i} group={group} />
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
}

export default GroupPage;
