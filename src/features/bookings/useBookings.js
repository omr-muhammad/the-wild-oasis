import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants.js';

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
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get('status') || 'all';
  const filter =
    filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 6000, method: 'gte' }

  // SORT
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, order] = sortValue.split('-');
  const sortBy = { field, order };

  // Pagination
  const page = Number(searchParams.get('page')) || 1;

  const { data: { data, count } = {}, isPending } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const countPage = Math.ceil(count / PAGE_SIZE);

  // FOR NEXT PAGE
  if (page < countPage)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // FOR PREVIOUS PAGE
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings: data, isPending, count };
}
