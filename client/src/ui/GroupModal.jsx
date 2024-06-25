import { Button, TextInput } from '@mantine/core';

function GroupModal({ onClick }) {
  return (
    <>
      <TextInput
        label="Group name"
        placeholder="Your group name"
        data-autofocus
      />
      <Button
        onClick={onClick}
        mt="md"
      >
        Submit
      </Button>
    </>
  );
}

export default GroupModal;
