import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as apiLogin } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (user) => apiLogin(user),
    mutationKey: ['login'],
    onSuccess: (user) => {
      toast.success('Successfully logged in');

      // Store the user in the query cache
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    login: mutate,
    isLoggingIn: isPending,
  };
}
