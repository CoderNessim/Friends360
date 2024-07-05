import { Avatar, Badge, Group, Paper, Text } from '@mantine/core';
import styles from './InboxItem.module.css';

function InboxItem({ invite }) {
  const displayMembers = invite.members.slice(0, 3);
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
          {invite.name}
        </Text>
        {/* <ActionIcons group={invite} /> */}
      </Group>

      <Group spacing="sm" align="center" className={styles.inviteDetails}>
        <Text size="sm" weight={500}>
          Admin: {invite.admin.username}
        </Text>
        <Avatar
          src={`/path/to/avatars/${invite.admin.profilePic}`} // Correct path to admin's picture
          alt={invite.admin.username}
          radius="xl"
          size="md"
        />
        <Text size="sm" color="dimmed">
          Members: {invite.members.length}
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
        {invite.members.length > 3 && (
          <Badge>+{invite.members.length - 3} more</Badge>
        )}
      </Group>
    </Paper>
  );
}

export default InboxItem;
