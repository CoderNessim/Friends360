import { Button, Group, Text, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';

function DeleteModal({ group, queryClient, groupMessageChannels, client }) {
  async function handleDelete() {
    try {
      const id = group._id;
      await crudOperations('groups', `deleteGroup/${group._id}`, 'DELETE');
      const associatedGroupChannels = groupMessageChannels.filter(
        (channel) => channel.data.metadata.groupId === id
      );
      if (associatedGroupChannels.length > 0) {
        await Promise.all(
          associatedGroupChannels.map((channel) =>
            client.channel(channel.type, channel.id).delete()
          )
        );
      }
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success(`Group "${group.name}" has been deleted`);
      modals.closeAll();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Stack spacing="md">
        <Text size="sm">
          Are you sure you want to delete the group{' '}
          <strong>{group.name}</strong>? This action cannot be undone.
        </Text>
        <Group grow>
          <Button color="red" fullWidth onClick={handleDelete}>
            Delete
          </Button>
          <Button fullWidth onClick={() => modals.closeAll()}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </div>
  );
}

export default DeleteModal;
