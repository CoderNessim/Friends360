import { Button, Modal } from '@mantine/core';
import styles from './AccountSettings.module.css';
import { useChatContext } from 'stream-chat-react';
import { useDisclosure } from '@mantine/hooks';
import DeleteAccountModal from './DeleteAccountModal';

function AccountSettings({ userId }) {
  const { client } = useChatContext();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.settingsContainer}>
      <Button
        color="red"
        size="md"
        className={styles.deleteButton}
        onClick={open}
      >
        Delete Account
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to delete your account?"
        centered={true}
        size="lg"
      >
        <DeleteAccountModal userId={userId} client={client} />
      </Modal>
    </div>
  );
}

export default AccountSettings;
