import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomLoader from './CustomLoader';
import { crudOperations } from '../utils/helpers';

function Protect({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
    enabled: !!user, // Ensure the query only runs if user exists
    initialData: () => {
      const initialGroups = queryClient.getQueryData(['groups']);
      return initialGroups ? initialGroups : undefined;
    }
  });

  if (!user) {
    toast.error('Please login to access this page');
    navigate('/login');
  }

  return (
    <>
      {children}
      {isPending && <CustomLoader size="lg" />}
    </>
  );
}

export default Protect;
