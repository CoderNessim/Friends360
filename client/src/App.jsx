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
//weird error
import GroupPage from './features/groups/GroupPage';
import InboxPage from './features/inbox/InboxPage';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

const streamApiKey = import.meta.env.VITE_STREAM_API;

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
        },
        {
          path: 'groups',
          element: <GroupPage />,
        },
        {
          path: 'inbox',
          element: <InboxPage />,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
