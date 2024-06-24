import { Button, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconCalendarStats,
  IconHome2,
  IconInbox,
  IconMessage2,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';

// This function returns an array of objects with icon and label properties
export function getNavLinks() {
  const links = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconMessage2, label: 'Messages' },
    { icon: IconInbox, label: 'Inbox' },
    { icon: IconCalendarStats, label: 'Calender' },
    { icon: IconUser, label: 'Account' },
    {
      icon: IconUsersGroup,
      label: 'Groups',
      onClick: () => {
        modals.open({
          title: 'Create a new group',
          children: (
            <>
              <TextInput
                label="Group name"
                placeholder="Your group name"
                data-autofocus
              />
              <Button  onClick={() => modals.closeAll()} mt="md">
                Submit
              </Button>
            </>
          ),
        });
      },
    },
    { icon: IconSettings, label: 'Settings' },
  ];
  return links;
}
