import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting } from '../../services/apiSettings.js';

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting Successfully Updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isUpdating: isPending,
    updateSetting: mutate,
  };
}
