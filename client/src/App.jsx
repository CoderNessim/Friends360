import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Map from './features/map/Map';
import LoginRegisterPage from './features/auth/LoginRegisterPage';
import Error from './ui/Error';
import ForgotPassword from './features/auth/ForgotPassword';
import ConfirmEmail from './features/auth/ConfirmEmail';
import ResetPassword from './features/auth/ResetPassword';
import HomeRedirect from './ui/HomeRedirect';
import Sidebar from './features/sidebar/Sidebar';
import Protect from './ui/Protect';
import GroupPage from './features/groups/GroupPage';
import InboxPage from './features/inbox/InboxPage';
import Messages, { messageLoader } from './features/messaging/Messages';
import { GroupProvider } from './context/GroupContext';
import AccountPage from './features/account/AccountPage';
import { ModalsProvider } from '@mantine/modals';
import PlanPage from './features/plans/PlanPage';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeRedirect />,
    },
    {
      path: '/login',
      element: <LoginRegisterPage type="login" />,
    },
    {
      path: '/register',
      element: <LoginRegisterPage type="register" />,
    },
    {
      path: '/forgotPassword',
      element: <ForgotPassword />,
    },
    {
      path: '/resetPassword/:resetPasswordToken',
      element: <ResetPassword />,
    },
    {
      path: '/confirmEmail/:confirmEmailToken',
      element: <ConfirmEmail />,
    },
    {
      path: '/app',
      element: (
        <Protect>
          <Sidebar />
        </Protect>
      ),
      errorElement: <Error />,
      children: [
        {
          path: 'map',
          element: <Map />,
          loader: messageLoader,
        },
        {
          path: 'groups',
          element: <GroupPage />,
          loader: messageLoader,
        },
        {
          path: 'inbox',
          element: <InboxPage />,
        },
        {
          path: 'messages',
          element: <Messages />,
          loader: messageLoader,
        },
        {
          path: 'account',
          element: <AccountPage />,
          loader: messageLoader,
        },
        {
          path: 'plans',
          element: <PlanPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Error routeDoesNotExist={true} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <GroupProvider>
        <RouterProvider router={router} />
      </GroupProvider>
    </QueryClientProvider>
  );
}

export default App;
