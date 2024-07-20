import { Container, Pagination, Stack, Title } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import styles from './GroupPage.module.css';
import GroupOptions from './GroupOptions';
import CustomLoader from '../../ui/CustomLoader';
import GroupItem from './GroupItem';
import { useSearchParams } from 'react-router-dom';
import { useGetGroups } from '../../hooks/useGetGroups';

const itemsPerPage = 3;

function GroupPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { groups, isGroupsPending } = useGetGroups();
  if (isGroupsPending) return <CustomLoader />;
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(groups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGroups = groups.slice(startIndex, endIndex);

  const groupNames = groups?.map((group) => group.name);

  function handlePageChange(page) {
    setSearchParams({ page });
  }

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
            {currentGroups.map((group, i) => (
              <GroupItem key={i} group={group} />
            ))}
          </Stack>
        )}
      </Container>
      <div className={styles.paginationWrapper}>
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default GroupPage;
