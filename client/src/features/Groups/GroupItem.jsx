import { Paper, Text, Group, Avatar } from '@mantine/core';
import styles from './GroupPage.module.css'; // Ensure correct import path
import ActionIcons from './ActionIcons';
import { useQueryClient } from '@tanstack/react-query';
import { openDeleteModal, openInviteModal } from '../../utils/modalHandlers';
import { crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';

function GroupItem({ group, groupMessageChannels, client }) {
  const displayMembers = group.members.slice(0, 3);
  const queryClient = useQueryClient();

  async function handleLeaveGroup() {
    try {
      const id = group._id;
      await crudOperations('groups', `leaveGroup/${group._id}`, 'DELETE');
      const associatedGroupChannels = groupMessageChannels.filter(
        (channel) => channel.data.metadata.groupId === id
      );
      if (associatedGroupChannels.length > 0) {
        await Promise.all(
          associatedGroupChannels.map((channel) =>
            client
              .channel(channel.type, channel.id)
              .removeMembers([client.userID])
          )
        );
      }
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success(`You have left "${group.name}"`);
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
      className={styles.groupItem}
    >
      <Group
        position="apart"
        style={{ width: '100%', alignItems: 'center', marginBottom: '10px' }}
      >
        <Text size="lg" weight={500}>
          {group.name}
        </Text>
        <ActionIcons
          handleInvite={() => openInviteModal(group)}
          handleDelete={() =>
            openDeleteModal(group, queryClient, groupMessageChannels, client)
          }
          handleLeaveGroup={handleLeaveGroup}
          isInbox={false}
        />
      </Group>

      <Group spacing="sm" align="center" className={styles.groupDetails}>
        <Text size="sm" weight={500}>
          Admin: {group.admin.username}
        </Text>
        <Avatar
          name={group.admin.username}
          // src={`/path/to/avatars/${group.admin.profilePic}`} // Correct path to admin's picture
          alt={group.admin.username}
          radius="xl"
          size="md"
        />
        <Text size="sm" color="dimmed">
          Members: {group.members.length}
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
          {group.members.length > 3 && (
            <Avatar>+{group.members.length - 3}</Avatar>
          )}
        </Avatar.Group>
      </Group>
    </Paper>
  );
}

export default GroupItem;
