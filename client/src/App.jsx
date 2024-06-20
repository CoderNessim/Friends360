import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Map from './features/map/Map';
import LoginRegisterPage from './features/auth/LoginRegisterPage';
import Error from './ui/Error';
import ForgotPassword from './features/auth/ForgotPassword';
import ConfirmEmail from './features/auth/ConfirmEmail';

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
      element: <div>Home</div>,
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
      path: '/confirmEmail/:confirmEmailToken',
      element: <ConfirmEmail />,
    },
    {
      path: 'map',
      element: <Map />,
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
