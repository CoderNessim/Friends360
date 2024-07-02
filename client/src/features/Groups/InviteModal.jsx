import { Button, TextInput } from '@mantine/core';
import { useInviteForm } from '../../forms/useInviteForm';
import { crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { modals } from '@mantine/modals';

function InviteModal({ group }) {
  const form = useInviteForm();

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const user = await crudOperations('groups', 'inviteToGroup', 'POST', {
        username: form.values.username,
        groupId: group._id,
      });
      toast.success(`Invite sent to ${user.username}!`);
      form.reset();
      modals.closeAll();
    } catch (error) {
      form.setErrors({ username: error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name of user"
        placeholder="Enter the username of the user you want to invite"
        data-autofocus
        required
        {...form.getInputProps('username')}
        error={form.errors.username}
      />
      <Button type="submit" mt="md">
        Invite
      </Button>
    </form>
  );
}

export default InviteModal;
