import { updateBooking } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPeding } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data /* This is what get returned from mutateFn */) => {
      toast.success(`Booking #${data.id}successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: (error) => toast.error(error.message),
  });

  return { checkin: mutate, isCheckingIn: isPeding };
}
