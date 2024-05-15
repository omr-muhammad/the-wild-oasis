import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { logout as apiLogout } from '../../services/apiAuth.js';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiLogout,
    mutationKey: ['logout'],
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Successfully logged out');
      navigate('/login', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    logout: mutate,
    isLoggingOut: isPending,
  };
}
