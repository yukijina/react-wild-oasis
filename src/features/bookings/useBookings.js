import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // queryKey has to be in array. we use queryKey later when we delete, update etc.
    queryKey: ['bookings'],
    // this function has to return promise (fetching returns promise)
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
