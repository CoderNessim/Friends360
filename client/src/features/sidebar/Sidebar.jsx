import { useState } from 'react';
import { Center, Loader, Stack } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';
import imagePath from '../../assets/friends360-removebg-preview.png';
import { loginSignup } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export default function Sidebar() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [active, setActive] = useState(2);
  const isLoading = navigation.state === 'loading';
  const links = mockdata.map((link, index) => (
    <SidebarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  async function handleLogout() {
    try {
      await loginSignup({}, 'logout');
      toast.success('Logout successful');
      queryClient.removeQueries(['user']);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <nav className={classes.navbar}>
            <Center>
              <img
                src={imagePath}
                className={classes.image}
                alt="Friends 360"
              />
            </Center>

            <div className={classes.navbarMain}>
              <Stack justify="center" gap={0}>
                {links}
              </Stack>
            </div>

            <Stack justify="center" gap={0}>
              <SidebarLink
                onClick={handleLogout}
                icon={IconLogout}
                label="Logout"
              />
            </Stack>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
}
