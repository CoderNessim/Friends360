import { modals } from '@mantine/modals';
import GroupModal from '../features/Groups/GroupModal';
import InviteModal from '../features/Groups/InviteModal';

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
