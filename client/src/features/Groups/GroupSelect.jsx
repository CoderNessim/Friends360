import { Select } from '@mantine/core';
import { useGroupProvider } from '../../context/GroupContext';

function GroupSelect({ groupNames, size, showLabel }) {
  const { currentGroupIndex, setCurrentGroupIndex } = useGroupProvider();
  function handleSelect(value) {
    const index = groupNames.indexOf(value);
    if (index !== -1) {
      setCurrentGroupIndex(index);
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
      value={groupNames[currentGroupIndex]}
      onChange={handleSelect}
    />
  );
}

export default GroupSelect;
