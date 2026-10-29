import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('status'));

  // Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    // initially data is empty before fetch, to prevent no data error, assigne empty
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // queryKey has to be in array. we use queryKey later when we delete, update etc.
    // fiter - whenever filter changed, it will re-fetch
    queryKey: ['bookings', filter, sortBy, page],
    // this function has to return promise (fetching returns promise)
    // queryFn: getBookings,
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
}
