import { modals } from '@mantine/modals';
import { crudOperations } from './helpers';
import GroupModal from '../ui/GroupModal';

export function openGroupModal(queryClient) {
  //handle custom logic for create group soon
  function handleClick() {
    crudOperations('groups', 'createGroup', 'POST', {
      name: 'Group 1',
    });
    queryClient.invalidateQueries(['groups']);
    modals.closeAll();
  }

  modals.open({
    title: 'Create a new group',
    children: <GroupModal onClick={handleClick} />,
  });
}
