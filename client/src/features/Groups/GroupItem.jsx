import { Paper, Text, Group, Avatar, Badge, ActionIcon } from '@mantine/core';
import { IconTrash, IconUserPlus } from '@tabler/icons-react';
import styles from './GroupPage.module.css'; // Ensure correct import path

function GroupItem({ group }) {
  const displayMembers = group.members.slice(0, 3);

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
        noWrap
      >
        <Text size="lg" weight={500}>
          {group.name}
        </Text>
        <Group spacing="xs" noWrap>
          <ActionIcon color="red" size="lg" title="Delete group">
            <IconTrash size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="blue" size="lg" title="Invite member">
            <IconUserPlus size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>

      <Group spacing="sm" align="center" className={styles.groupDetails}>
        <Text size="sm" weight={500}>
          Admin: {group.admin.username}
        </Text>
        <Avatar
          src={`/path/to/avatars/${group.admin.profilePic}`} // Correct path to admin's picture
          alt={group.admin.username}
          radius="xl"
          size="md"
        />
        <Text size="sm" color="dimmed">
          Members: {group.members.length}
        </Text>
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
          <Badge>+{group.members.length - 3} more</Badge>
        )}
      </Group>
    </Paper>
  );
}

export default GroupItem;
