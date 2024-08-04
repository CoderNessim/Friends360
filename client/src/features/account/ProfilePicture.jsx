import { Card, FileInput, Image } from '@mantine/core';
import styles from './ProfilePicture.module.css';
import { getPhotoUrl } from '../../utils/helpers';

function ProfilePicture({ user }) {
  return (
    <div className={styles.profileWrapper}>
      <Card padding="lg" radius="md" className={styles.card}>
        <Card.Section>
          <Image
            height={200}
            src={getPhotoUrl(user.photo)}
            fit="cover"
            alt="Profile Picture"
            className={styles.image}
            fallbackSrc="https://placehold.co/600x400?text=Profile"
          />
        </Card.Section>
      </Card>
      <FileInput
        variant="filled"
        placeholder="Input placeholder"
        className={styles.fileInput}
      />
    </div>
  );
}

export default ProfilePicture;
