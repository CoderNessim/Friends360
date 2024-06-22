import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginSignup } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLoginQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ body, type }) => loginSignup(body, type),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(['user'], user);
      toast.success(`Welcome back, ${user.data.user.username}!`);
      navigate('/app/map');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError };
}
