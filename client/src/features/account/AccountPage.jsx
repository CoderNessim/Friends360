import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import CustomLoader from '../../ui/CustomLoader';
import AccountSettings from './AccountSettings';
import ProfileDetails from './ProfileDetails';
import ProfilePicture from './ProfilePicture';
import { Container, Divider, Title } from '@mantine/core';
import styles from './AccountPage.module.css';
import { getPhotoUrl } from '../../utils/helpers';
import { useState } from 'react';
import { Chat } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);
function AccountPage() {
  const { user, isUserPending } = useGetUser();
  const { groups, isGroupsPending } = useGetGroups();
  const [file, setFile] = useState(getPhotoUrl(user.photo));

  if (isUserPending || isGroupsPending) return <CustomLoader />;

  return (
    <Chat client={client}  >
      <Container className={styles.container}>
        <Title order={2} className={styles.title}>
          Account Page
        </Title>
        <div className={styles.content}>
          <div className={styles.profileCol}>
            <ProfilePicture file={file} setFile={setFile} userId={user.id} />
          </div>
          <div className={styles.detailsCol}>
            <ProfileDetails user={user} groups={groups} />
          </div>
        </div>
        <Divider my="sm" />
        <AccountSettings />
      </Container>
    </Chat>
  );
}

export default AccountPage;
