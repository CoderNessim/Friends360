import { Center, Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';
import imagePath from '../../assets/friends360-removebg-preview.png';
import { loginSignup } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import SidebarLinksGroup from './SidebarLinksGroup';
import Nav from './Nav';
import { useNavLinks } from '../../utils/navLinks.jsx';
import { StreamChat } from 'stream-chat';
import { useGetInvites } from '../../hooks/useGetInvites.jsx';
import CustomLoader from '../../ui/CustomLoader.jsx';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

export default function Sidebar() {
  const { invites } = useGetInvites();
  //for some reason the invites object is nested in another object sometimes
  const navLinks = useNavLinks(invites.invites || invites);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isLoading = navigation.state === 'loading';
  // Get the pathname part of the URL
  const pathname = window.location.pathname;

  // Split the pathname into an array of segments
  const pathSegments = pathname.split('/');

  // Filter out any empty segments (in case the URL ends with a slash)
  const filteredSegments = pathSegments.filter((segment) => segment.length > 0);

  // Get the last segment
  const lastSegment = filteredSegments[filteredSegments.length - 1];
  const links = navLinks.map((link) => (
    <SidebarLink
      {...link}
      key={link.label}
      active={lastSegment === link.label.toLowerCase()}
      onClick={() => navigate(link.label.toLowerCase())}
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
        <CustomLoader />
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
