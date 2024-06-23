import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { confirmEmail } from '../../services/apiAuth';

export function useConfirmEmailQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ token }) => confirmEmail(token),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success(`Welcome to Friends360, ${user.data.user.username}!`);
      navigate('/app/map');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError };
}
