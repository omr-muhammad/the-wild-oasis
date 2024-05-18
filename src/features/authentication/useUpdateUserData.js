import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserData } from '../../services/apiAuth.js';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (userData) => updateUserData(userData),
    mutationKey: ['user'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User data updated successfully');
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    updateUser: mutate,
    isUpdating: isPending,
  };
}
