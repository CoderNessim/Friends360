import { ActionIcon, Group } from '@mantine/core';
import { IconTrash, IconUserPlus } from '@tabler/icons-react';
import { openDeleteModal, openInviteModal } from '../../utils/modalHandlers';
import { useQueryClient } from '@tanstack/react-query';

function ActionIcons({ group }) {
  const queryClient = useQueryClient();
  return (
    <Group spacing="xs" noWrap>
      <ActionIcon
        color="red"
        size="lg"
        title="Delete group"
        onClick={() => openDeleteModal(group, queryClient)}
      >
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
