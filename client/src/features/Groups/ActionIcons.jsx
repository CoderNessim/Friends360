import { ActionIcon, Group } from '@mantine/core';
import { IconLogout, IconTrash, IconUserPlus } from '@tabler/icons-react';

function ActionIcons({
  handleInvite,
  handleDelete,
  isInbox,
  handleLeaveGroup,
}) {
  return (
    <Group spacing="xs">
      <ActionIcon
        color="red"
        size="lg"
        title={`Delete ${isInbox ? 'invite' : 'group'} `}
        onClick={handleDelete}
      >
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        color="blue"
        size="lg"
        title={`${isInbox ? 'Join group' : 'Invite member'} `}
        onClick={handleInvite}
      >
        <IconUserPlus size={18} stroke={1.5} />
      </ActionIcon>
      {!isInbox && (
        <>
          <ActionIcon
            color="orange"
            size="lg"
            title="Leave group"
            onClick={handleLeaveGroup}
          >
            <IconLogout size={18} stroke={1.5} />
          </ActionIcon>
        </>
      )}
    </Group>
  );
}

export default ActionIcons;
