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
  console.log(groups);
  if (isPending) return <CustomLoader />;
  if (!groups) return <div>no groups</div>;

  

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
        <GroupOptions queryClient={queryClient} styles={styles} />
        <Stack>
          {groups.map((group, i) => (
            <GroupItem key={i} group={group} />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default GroupPage;
