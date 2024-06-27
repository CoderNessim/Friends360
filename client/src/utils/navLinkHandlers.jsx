import { modals } from '@mantine/modals';
import GroupModal from '../features/Groups/GroupModal';

export function openGroupModal(queryClient) {
  modals.open({
    title: 'Create a new group',
    children: <GroupModal queryClient={queryClient} />,
  });
}
