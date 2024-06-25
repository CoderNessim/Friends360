import { Button, TextInput } from '@mantine/core';
import { crudOperations } from '../utils/helpers';
import toast from 'react-hot-toast';
import { modals } from '@mantine/modals';
import { useCreateGroupForm } from '../forms/useCreateGroupForm';

function GroupModal({ queryClient }) {
  const form = useCreateGroupForm();

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const group = await crudOperations('groups', 'createGroup', 'POST', {
        name: form.values.groupName,
      });
      toast.success(`Group "${group.data.data.name}" created successfully`);
      queryClient.invalidateQueries(['groups']);
      form.reset();
      modals.closeAll();
    } catch (error) {
      form.setErrors({ groupName: error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Group name"
        placeholder="Your group name"
        data-autofocus
        required
        {...form.getInputProps('groupName')}
        error={form.errors.groupName}
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}

export default GroupModal;
