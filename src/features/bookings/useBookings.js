import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';

const query = {
  queryKey: ['bookings'],
  queryFn: getBookings,
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(queryClient) {
  return async () => {
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
}

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status') || 'all';
  const filter =
    filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 6000, method: 'gte' }

  // SORT
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, order] = sortValue.split('-');
  const sortBy = { field, order };

  const { data: bookings, isPending } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { bookings, isPending };
}
