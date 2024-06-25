import { modals } from '@mantine/modals';
import GroupModal from '../ui/GroupModal';

export function openGroupModal(queryClient) {
  modals.open({
    title: 'Create a new group',
    children: <GroupModal queryClient={queryClient} />,
  });
}
