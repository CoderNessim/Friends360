import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import CustomLoader from '../../ui/CustomLoader';
import AccountSettings from './AccountSettings';
import ProfileDetails from './ProfileDetails';
import ProfilePicture from './ProfilePicture';
import { Container, Divider, Title } from '@mantine/core';
import styles from './AccountPage.module.css';

function AccountPage() {
  const { user, isUserPending } = useGetUser();
  const { groups, isGroupsPending } = useGetGroups();

  if (isUserPending || isGroupsPending) return <CustomLoader />;

  return (
    <Container className={styles.container}>
      <Title order={2} className={styles.title}>
        Account Page
      </Title>
      <div className={styles.content}>
        <div className={styles.profileCol}>
          <ProfilePicture user={user} />
        </div>
        <div className={styles.detailsCol}>
          <ProfileDetails user={user} groups={groups} />
        </div>
      </div>
      <Divider my="sm" />
      <AccountSettings />
    </Container>
  );
}

export default AccountPage;
