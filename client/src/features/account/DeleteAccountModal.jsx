import { Button, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useDeleteUser } from './useDeleteUser';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function DeleteAccountModal({ userId, client }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteUser(client, queryClient, userId);
  async function deleteAccount() {
    mutate();
    navigate('/');
  }

  return (
    <div style={{ width: '100%' }}>
      <Stack spacing="md">
        <Text size="sm">
          Are you sure you want to delete your account? Once you delete your
          account, all of your data will be permanently deleted.
        </Text>
        <Group grow>
          <Button
            color="red"
            fullWidth
            onClick={deleteAccount}
            disabled={isPending}
          >
            Delete
          </Button>
          <Button
            fullWidth
            onClick={() => modals.closeAll()}
            disabled={isPending}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </div>
  );
}

export default DeleteAccountModal;
