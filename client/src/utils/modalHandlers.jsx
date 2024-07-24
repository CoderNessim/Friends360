import { modals } from '@mantine/modals';
import GroupModal from '../features/groups/GroupModal';
import InviteModal from '../features/groups/InviteModal';
import DeleteModal from '../features/groups/DeleteModal';

export function openGroupModal(queryClient) {
  modals.open({
    title: 'Create a new group',
    children: <GroupModal queryClient={queryClient} />,
  });
}

export function openInviteModal(group) {
  modals.open({
    title: 'Invite a member',
    children: <InviteModal group={group} />,
  });
}

export function openDeleteModal(group, queryClient, groupMessageChannels, client) {
  modals.open({
    title: 'Are you sure you want to delete this group?',
    size: 'lg',
    centered: true,
    children: (
      <DeleteModal
        group={group}
        queryClient={queryClient}
        groupMessageChannels={groupMessageChannels}
        client={client}
      />
    ),
  });
}
