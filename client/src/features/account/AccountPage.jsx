import { useGetUser } from '../../hooks/useGetUser';
import CustomLoader from '../../ui/CustomLoader';
import AccountSettings from './AccountSettings';
import ProfileDetails from './ProfileDetails';
import ProfilePicture from './ProfilePicture';
import { Container, Grid, Card, Group, Text } from '@mantine/core';
import styles from './AccountPage.module.css';

function AccountPage() {
  const { user, isUserPending } = useGetUser();

  if (isUserPending) return <CustomLoader />;
  return (
    <Container>
      <Grid>
        <Grid.Col span={12}>
          <Text className={styles.title}>{user.name}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <ProfilePicture user={user} />
        </Grid.Col>
        <Grid.Col span={9}>
          <ProfileDetails user={user} />
        </Grid.Col>
        <Grid.Col span={12}>
          <AccountSettings />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default AccountPage;
