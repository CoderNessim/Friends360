import { Button, Stack } from '@mantine/core';
import { openGroupModal } from '../../utils/navLinkHandlers';
import GroupSelect from './GroupSelect';

function GroupOptions({ styles, queryClient }) {
  return (
    <div className={styles.centerStack}>
      <Stack spacing="sm" mb="lg">
        <GroupSelect />
        <Button onClick={() => openGroupModal(queryClient)} size="sm">
          Create a Group
        </Button>
      </Stack>
    </div>
  );
}

export default GroupOptions;
