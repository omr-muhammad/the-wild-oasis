import { useSearchParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import Table from '../../ui/Table.jsx';

import useFilterSort from './useFilterSort.js';
import { useCabins } from './useCabins.js';

import { getCabins } from '../../services/apiCabins.js';

const query = {
  queryKey: ['cabins'],
  queryFn: getCabins,
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

export default function CabinTable() {
  const { cabins, isLoadingCabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('discount') || 'all';
  const sortValue = searchParams.get('sortBy') || 'startDate-asc';

  const organizedCabins = useFilterSort(cabins, {
    filterBy: filterValue,
    sortBy: sortValue,
  });

  return (
    <>
      {isLoadingCabins ? (
        <Spinner />
      ) : (
        <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={organizedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />
        </Table>
      )}
    </>
  );
}
