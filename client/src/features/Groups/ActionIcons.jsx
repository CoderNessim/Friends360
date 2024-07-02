import { ActionIcon, Group } from '@mantine/core';
import { IconTrash, IconUserPlus } from '@tabler/icons-react';
import { openInviteModal } from '../../utils/modalHandlers';

function ActionIcons({ group }) {
  return (
    <Group spacing="xs" noWrap>
      <ActionIcon color="red" size="lg" title="Delete group">
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        color="blue"
        size="lg"
        title="Invite member"
        onClick={() => openInviteModal(group)}
      >
        <IconUserPlus size={18} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}

export default ActionIcons;
