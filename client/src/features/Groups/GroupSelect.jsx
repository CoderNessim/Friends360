import { Select } from '@mantine/core';
import Cookies from 'js-cookie';

function GroupSelect({ groupNames, size, showLabel }) {
  function handleSelect(value) {
    const index = groupNames.indexOf(value);
    if (index !== -1) {
      Cookies.set('currentGroupIndex', index);
    }
  }

  return (
    <Select
      label={showLabel ? 'Current Group' : null}
      placeholder="Select Group"
      data={groupNames}
      allowDeselect={false}
      nothingFoundMessage="No groups found"
      maxDropdownHeight={100}
      size={size}
      onChange={handleSelect}
    />
  );
}

export default GroupSelect;
