import { Container, Pagination, Stack, Title } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import styles from './GroupPage.module.css';
import GroupOptions from './GroupOptions';
import CustomLoader from '../../ui/CustomLoader';
import GroupItem from './GroupItem';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useGetGroups } from '../../hooks/useGetGroups';
import { useEffect } from 'react';
import { connectUser } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';
import { useGetUser } from '../../hooks/useGetUser';
import useGetUserGroups from '../../hooks/useGetUserGroups';

const streamApiKey = import.meta.env.VITE_STREAM_API;
const client = StreamChat.getInstance(streamApiKey);
const itemsPerPage = 3;

function GroupPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { groups, isGroupsPending } = useGetGroups();
  const { user, isUserPending } = useGetUser();
  const streamToken = useLoaderData();

  useEffect(() => {
    if (!client.userID && user && streamToken) {
      connectUser(client, streamToken, user);
    }
  }, [user, streamToken]);
  const {
    groups: groupMessageChannels,
    isLoading: isGroupMessageChannelsLoading,
  } = useGetUserGroups(user?.id, client);

  if (isGroupsPending || isUserPending || isGroupMessageChannelsLoading)
    return <CustomLoader />;

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
              <GroupItem
                client={client}
                key={i}
                group={group}
                groupMessageChannels={groupMessageChannels}
              />
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
