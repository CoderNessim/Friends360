import { useQuery } from '@tanstack/react-query';
import { crudOperations } from '../utils/helpers';

export function useGetInvites() {
  const {
    data: invites,
    isPending: isInvitesPending,
    isError: isInvitesError,
  } = useQuery({
    queryKey: ['invites'],
    queryFn: () => crudOperations('users', 'getInvites', 'GET'),
  });

  return { invites, isInvitesPending, isInvitesError };
}
