import { useQuery } from '@tanstack/react-query';
import { crudOperations } from '../utils/helpers';

export function useGetGroups() {
  const {
    data: groups,
    isPending: isGroupsPending,
    isError: isGroupError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
  });

  return { groups, isGroupsPending, isGroupError };
}
