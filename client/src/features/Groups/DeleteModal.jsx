import { Button, Group, Text, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';

function DeleteModal({ group, queryClient }) {
  async function handleDelete() {
    try {
      
      await crudOperations('groups', `deleteGroup/${group._id}`, 'DELETE');
     
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
