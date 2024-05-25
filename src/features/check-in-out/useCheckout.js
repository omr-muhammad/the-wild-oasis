import { updateBooking } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIsAdmin } from '../authentication/useIsAdmin.js';

export function useCheckout() {
  const isAdmin = useIsAdmin();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(
        bookingId,
        {
          status: 'checked-out',
        },
        isAdmin
      ),
    onSuccess: (data /* This is what gets returned from mutateFn */) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { checkout: mutate, isCheckingOut: isPending };
}
