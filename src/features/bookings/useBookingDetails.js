import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings.js';
import { useParams } from 'react-router-dom';

export function useBookingDetails() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending,
    error,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isPending, error };
}
