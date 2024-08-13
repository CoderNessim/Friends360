import {
  IconCalendarStats,
  IconHome2,
  IconInbox,
  IconMessage2,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { openGroupModal } from './modalHandlers';
import { useQueryClient } from '@tanstack/react-query';

const IconWithNotification = ({ icon: Icon, showNotification }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <Icon stroke="currentColor" strokeWidth={1.3} />
    {showNotification && (
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'red',
          borderRadius: '50%',
          border: '1px solid white',
        }}
      />
    )}
  </div>
);
// This function returns an array of objects with icon and label properties
export function useNavLinks(invites = []) {
  const queryClient = useQueryClient();
  const links = [
    { icon: IconHome2, label: 'Map' },
    { icon: IconMessage2, label: 'Messages' },
    {
      icon: () => (
        <IconWithNotification
          icon={IconInbox}
          showNotification={invites.length > 0}
        />
      ),
      label: 'Inbox',
    },
    { icon: IconCalendarStats, label: 'Plans' },
    { icon: IconUser, label: 'Account' },
    {
      icon: IconUsersGroup,
      label: 'Groups',
      onClick: () => openGroupModal(queryClient),
    },
  ];
  return links;
}
