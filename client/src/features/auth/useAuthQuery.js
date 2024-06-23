import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuthQuery(authFunction) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ body, type }) => authFunction(body, type),
    onSuccess: (user) => {
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
