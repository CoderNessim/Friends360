import { Button, Stack } from '@mantine/core';
import { openGroupModal } from '../../utils/modalHandlers';
import GroupSelect from './GroupSelect';

function GroupOptions({ styles, queryClient, groupNames }) {
  return (
    <div className={styles.centerStack}>
      <Stack spacing="sm" mb="lg">
        <GroupSelect groupNames={groupNames} size="xs" showLabel={true} />
        <Button onClick={() => openGroupModal(queryClient)} size="sm">
          Create a Group
        </Button>
      </Stack>
    </div>
  );
}

export default GroupOptions;
