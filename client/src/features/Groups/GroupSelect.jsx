import { Select } from '@mantine/core';
import Cookies from 'js-cookie';

function GroupSelect() {
  const groups = JSON.parse(Cookies.get('groupNames'));
  return (
    <Select
      label="Current Group"
      placeholder="Select Group"
      data={groups}
      allowDeselect={false}
      searchable
      nothingFoundMessage="No groups found"
      maxDropdownHeight={100}
      size='xs'
    />
  );
}

export default GroupSelect;
