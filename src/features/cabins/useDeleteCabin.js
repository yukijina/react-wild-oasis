import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // delete cabin
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // with this code, storefront sync with data once it is deleted.
    onSuccess: () => {
      toast.success('Cabin was successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    // this error can access to error in apiCabin error message
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
