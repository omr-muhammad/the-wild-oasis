import { useQuery } from '@tanstack/react-query';

import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import Table from '../../ui/Table.jsx';

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
  const { data: cabins, isPending /* error */ } = useQuery(query);

  if (isPending) return <Spinner />;

  return (
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
        data={cabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}
