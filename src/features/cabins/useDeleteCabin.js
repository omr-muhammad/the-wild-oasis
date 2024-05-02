import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export function useDeleteCabin(cabinId, image) {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => deleteCabin(cabinId, image),
    onSuccess: () => {
      toast.success('Cabin Successfuly Deleted');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isDeleting,
    deleteCabin: mutate,
  };
}
