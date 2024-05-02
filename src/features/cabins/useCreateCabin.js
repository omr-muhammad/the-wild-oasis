import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export function useCreateCabin(reset) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin Successfully Created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isCreating: isPending,
    createCabin: mutate,
  };
}
