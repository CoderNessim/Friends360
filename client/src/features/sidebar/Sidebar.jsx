import { useState } from 'react';
import { Center, Loader, Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import {
  Outlet,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { SidebarLink } from './SidebarLink';
import imagePath from '../../assets/friends360-removebg-preview.png';
import { loginSignup } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import SidebarLinksGroup from './SidebarLinksGroup';
import Nav from './Nav';
import { useNavLinks } from '../../utils/navLinks.jsx';
import { StreamChat } from 'stream-chat';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

export default function Sidebar() {
  const navLinks = useNavLinks();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const isLoading = navigation.state === 'loading';

  const links = navLinks.map((link, index) => (
    <SidebarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.label === 'Home' ? 'map' : link.label.toLowerCase());
      }}
    />
  ));

  async function handleLogout() {
    try {
      await loginSignup({}, 'logout');
      client.disconnectUser();
      toast.success('Logout successful');
      queryClient.removeQueries(['user']);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className={classes.layout}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <Header /> */}
          <div className={classes.container}>
            <Nav>
              <Center>
                <img
                  src={imagePath}
                  className={classes.image}
                  alt="Friends 360"
                  onClick={() => navigate('/app/map')}
                />
              </Center>

              <SidebarLinksGroup links={links} />

              <Stack justify="center" gap={0}>
                <SidebarLink
                  onClick={handleLogout}
                  icon={IconLogout}
                  label="Logout"
                />
              </Stack>
            </Nav>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
