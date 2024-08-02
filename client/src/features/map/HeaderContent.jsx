import { Avatar } from '@mantine/core';
import styles from './HeaderContent.module.css'

function HeaderContent({ member }) {
  return (
    <div className={styles.headerContainer}>
      <Avatar
        color="initials"
        name={member.username}
        allowedInitialsColors={['blue', 'red', 'green', 'purple', 'black']}
        key={member.username}
        size={32}
      />
      <h2 className={styles.header}>{member.username}</h2>
    </div>
  );
}

export default HeaderContent;
