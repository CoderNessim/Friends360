import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuthQuery(authFunction) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ body, type }) => authFunction(body, type),
    onSuccess: (user) => {
      const { user: userData } = user.data;

      const flattenedUser = {
        ...userData,
      };

      const groups = flattenedUser.groups;
      const invites = flattenedUser.invites;
      delete flattenedUser.groups;
      delete flattenedUser.invites;
      queryClient.setQueryData(['groups'], groups);
      queryClient.setQueryData(['user'], flattenedUser);
      queryClient.setQueryData(['invites'], invites);
      toast.success(`Welcome back, ${flattenedUser.username}!`);
      navigate('/app/map');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError };
}
