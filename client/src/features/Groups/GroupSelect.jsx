import { Select } from '@mantine/core';

function GroupSelect({ groupNames }) {
  return (
    <Select
      label="Current Group"
      placeholder="Select Group"
      data={groupNames}
      allowDeselect={false}
      searchable
      nothingFoundMessage="No groups found"
      maxDropdownHeight={100}
      size="xs"
    />
  );
}

export default GroupSelect;
