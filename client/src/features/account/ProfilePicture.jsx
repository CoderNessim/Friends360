import { Card, Image } from '@mantine/core';
import styles from './ProfilePicture.module.css';

function ProfilePicture({ user }) {
  return (
    <div className={styles.profileWrapper}>
      <Card padding="lg" radius="md" className={styles.card}>
        <Card.Section>
          <Image
            height={200}
            src={user.photo}
            fit="contain"
            fallbackSrc="https://placehold.co/600x400?text=Profile"
          />
        </Card.Section>
      </Card>
    </div>
  );
}

export default ProfilePicture;
