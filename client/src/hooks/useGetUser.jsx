import { useQuery } from '@tanstack/react-query';
import { crudOperations } from '../utils/helpers';

export function useGetUser() {
  const {
    data: user,
    isPending: isUserPending,
    isError: isUserError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  return { user, isUserPending, isUserError };
}
