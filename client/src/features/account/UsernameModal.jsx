import { Button, Modal, TextInput, Group } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

function UsernameModal({ openedUsername, closeUsername, userId, client }) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your submission logic here
      const response = await fetch('http://localhost:3000/api/users/updateMe', {
        method: 'PATCH',
        body: JSON.stringify({ username }), // Convert body to JSON string
        headers: {
          'Content-Type': 'application/json', // Set the correct content type
        },
        credentials: 'include', // Include cookies if needed
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update username');
      }

      const update = {
        id: userId,
        set: {
          name: data.data.doc.username,
        },
      };
      await client.partialUpdateUser(update);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast.success('Username updated successfully');
      closeUsername();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={openedUsername}
      onClose={closeUsername}
      title="Update Username"
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="New Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <Group position="right" mt="sm" spacing="sm">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
          <Button variant="outline" onClick={closeUsername}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default UsernameModal;
