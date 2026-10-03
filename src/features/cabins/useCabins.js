import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // queryKey has to be in array. we use queryKey later when we delete, update etc.
    queryKey: ['cabins'],
    // this function has to return promise (fetching returns promise)
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
