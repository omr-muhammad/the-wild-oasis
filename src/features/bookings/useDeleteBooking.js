import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';
import { useIsAdmin } from '../authentication/useIsAdmin.js';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const isAdmin = useIsAdmin();

  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId, isAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking Deleted Successfully');
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteBooking: mutate, isDeleting: isPending };
}
