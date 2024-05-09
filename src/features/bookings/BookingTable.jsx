import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty.jsx';
import Spinner from '../../ui/Spinner.jsx';
import { useBookings } from './useBookings.js';

function BookingTable() {
  const { bookings, isPending } = useBookings();

  if (isPending) return <Spinner />;
  if (!bookings.length) return <Empty resource='booking' />;

  return (
    <Menus>
      <Table $columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
