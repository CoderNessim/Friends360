import {
  IconCalendarStats,
  IconHome2,
  IconInbox,
  IconMessage2,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { openGroupModal } from './navLinkHandlers';
import { useQueryClient } from '@tanstack/react-query';

// This function returns an array of objects with icon and label properties
export function useNavLinks() {
  const queryClient = useQueryClient();

  const links = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconMessage2, label: 'Messages' },
    { icon: IconInbox, label: 'Inbox' },
    { icon: IconCalendarStats, label: 'Calender' },
    { icon: IconUser, label: 'Account' },
    {
      icon: IconUsersGroup,
      label: 'Groups',
      onClick: () => openGroupModal(queryClient),
    },
    { icon: IconSettings, label: 'Settings' },
  ];
  return links;
}
