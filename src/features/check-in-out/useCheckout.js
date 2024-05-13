import { updateBooking } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data /* This is what gets returned from mutateFn */) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { checkout: mutate, isCheckingOut: isPending };
}
