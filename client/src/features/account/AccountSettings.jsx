import { Button } from '@mantine/core';
import styles from './AccountSettings.module.css';

function AccountSettings() {
  return (
    <div className={styles.settingsContainer}>
      <Button color="red" size="md" className={styles.deleteButton}>
        Delete Account
      </Button>
    </div>
  );
}

export default AccountSettings;
