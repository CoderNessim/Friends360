import { Card, FileInput, Image } from '@mantine/core';
import styles from './ProfilePicture.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useChatContext } from 'stream-chat-react';
import { useQueryClient } from '@tanstack/react-query';

function ProfilePicture({ file, setFile, userId }) {
  const { client } = useChatContext();
  const queryClient = useQueryClient();
  const [isFileLoading, setIsFileLoading] = useState(false);
  async function handleFileChange(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    //crudOperations does not handle file uploads
    try {
      setIsFileLoading(true);
      const response = await fetch('http://localhost:3000/api/users/updateMe', {
        method: 'PATCH',
        body: formData,
        credentials: 'include', // Include cookies if needed
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile picture');
      }
      const update = {
        id: userId,
        set: {
          photo: data.data.doc.photo,
        },
      };
      await client.partialUpdateUser(update);
      toast.success('Profile picture updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      setFile(URL.createObjectURL(file)); // Update the local state with the selected file's URL
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsFileLoading(false);
    }
  }

  return (
    <div className={styles.profileWrapper}>
      <Card padding="lg" radius="md" className={styles.card}>
        <Card.Section>
          <Image
            height={200}
            src={file}
            fit="cover"
            alt="Profile Picture"
            className={styles.image}
            fallbackSrc="https://placehold.co/600x400?text=Profile"
          />
        </Card.Section>
      </Card>
      <FileInput
        variant="filled"
        placeholder="Select photo"
        className={styles.fileInput}
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
        disabled={isFileLoading}
      />
    </div>
  );
}

export default ProfilePicture;
