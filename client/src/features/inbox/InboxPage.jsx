import { Pagination, Stack, Title } from '@mantine/core';
import styles from './InboxPage.module.css';
import CustomLoader from '../../ui/CustomLoader';
import InboxItem from './InboxItem';
import { useSearchParams } from 'react-router-dom';
import { useGetInvites } from '../../hooks/useGetInvites';

const itemsPerPage = 3;

function InboxPage() {
  const { invites: data, isInvitesPending } = useGetInvites();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isInvitesPending) return <CustomLoader />;

  const invites = data.invites || data;

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(invites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvites = invites.slice(startIndex, endIndex);

  function handlePageChange(page) {
    setSearchParams({ page });
  }

  return (
    <>
      <Title order={1} align="center" mt="md" mb="lg" className={styles.title}>
        Inbox
      </Title>
      {invites.length === 0 ? (
        <h3 className={styles.noInvites}>
          Inbox is empty, reload the page or check back later!
        </h3>
      ) : (
        <Stack className={styles.stack}>
          {currentInvites.map((invite, i) => (
            <InboxItem key={i} invite={invite} />
          ))}
        </Stack>
      )}
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

export default InboxPage;
