import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings.js';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numsOfDays = Number(searchParams.get('last')) || 7;
  const queryDate = subDays(new Date(), numsOfDays).toISOString();

  const { data, isPending } = useQuery({
    queryKey: ['stays', numsOfDays],
    queryFn: () => getStaysAfterDate(queryDate),
    // onSuccess: () => {},
  });

  const confirmedStays = data?.filter(
    (booking) =>
      booking.status === 'checked-in' || booking.status === 'checked-out'
  );

  return {
    stays: data,
    isLoadingStays: isPending,
    confirmedStays,
    numsOfDays,
  };
}
