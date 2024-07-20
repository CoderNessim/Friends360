import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomLoader from './CustomLoader';
import { crudOperations } from '../utils/helpers';
import { useGetUser } from '../hooks/useGetUser';

function Protect({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isUserPending, isUserError } = useGetUser();
  useEffect(() => {
    if (!isUserPending && !user) {
      toast.error('Please login to access this page');
      navigate('/login');
    }
  }, [user, isUserPending, navigate]); // Include isPending in the dependencies

  useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
    enabled: !!user,
    initialData: () => {
      const initialGroups = queryClient.getQueryData(['groups']);
      return initialGroups ? initialGroups : undefined;
    },
  });

  useQuery({
    queryKey: ['invites'],
    queryFn: () => crudOperations('users', 'getInvites', 'GET'),
    enabled: !!user,
    initialData: () => {
      const initialInvites = queryClient.getQueryData(['invites']);
      return initialInvites ? initialInvites : undefined;
    },
  });

  if (isUserPending) {
    return <CustomLoader size="lg" />;
  }

  if (isUserError) {
    return <div>Failed to load user data</div>;
  }

  return <>{children}</>;
}

export default Protect;
