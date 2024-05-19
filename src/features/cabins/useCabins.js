import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins.js';

export function useCabins() {
  const { data, isPending } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return {
    cabins: data,
    isLoadingCabin: isPending,
  };
}
