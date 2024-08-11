import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { crudOperations } from '../../utils/helpers';

export function useDeleteUser(client, queryClient, userId) {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => crudOperations('users', 'deleteMe', 'DELETE', {}, userId),
    onSuccess: () => {
      
      queryClient.removeQueries({ queryKey: ['users'] });
      queryClient.removeQueries({ queryKey: ['groups'] });
      queryClient.removeQueries({ queryKey: ['plans'] });
      toast.success('Account deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError };
}
