import { Avatar, Group, Paper, Text } from '@mantine/core';
import styles from './InboxItem.module.css';
import ActionIcons from '../groups/ActionIcons';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { crudOperations } from '../../utils/helpers';

function InboxItem({ invite }) {
  const displayMembers = invite.members.slice(0, 3);
  const queryClient = useQueryClient();

  async function handleInvite(isAccept) {
    try {
      // Call your API to accept or decline the invite
      if (isAccept) {
        await crudOperations('groups', `acceptInvite/${invite._id}`, 'PATCH');
      } else {
        await crudOperations('groups', `declineInvite/${invite._id}`, 'PATCH');
      }
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`You ${isAccept ? 'accepted' : 'declined'} the invite`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Paper
      withBorder
      shadow="xs"
      p="sm"
      radius="md"
      className={styles.inviteItem}
    >
      <Group
        position="apart"
        style={{ width: '100%', alignItems: 'center', marginBottom: '10px' }}
        noWrap
      >
        <Text size="lg" weight={500}>
          You were invited to join group <strong>{invite.name}</strong>
        </Text>

        <ActionIcons
          handleInvite={() => handleInvite(true)}
          handleDelete={() => handleInvite(false)}
          isInbox={true}
        />
      </Group>

      <Group spacing="sm" align="center" className={styles.inviteDetails}>
        <Text size="sm" weight={500}>
          Admin: {invite.admin.username}
        </Text>
        <Avatar
          name={invite.admin.username}
          // src={`/path/to/avatars/${invite.admin.profilePic}`} // Correct path to admin's picture
          alt={invite.admin.username}
          radius="xl"
          size="md"
        />
        <Text size="sm" color="dimmed">
          Members: {invite.members.length}
        </Text>
        <Avatar.Group>
          {displayMembers.map((member, index) => (
            <Avatar
              key={index}
              src={`/path/to/avatars/${member.photo}`} // Adjust based on your member object structure
              alt={member.username}
              radius="xl"
              size="md"
            />
          ))}
          {invite.members.length > 3 && (
            <Avatar>+{invite.members.length - 3}</Avatar>
          )}
        </Avatar.Group>
      </Group>
    </Paper>
  );
}

export default InboxItem;
