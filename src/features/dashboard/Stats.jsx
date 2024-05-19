import {
  HiBanknotes,
  HiCalendarDays,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat.jsx';
import { formatCurrency } from '../../utils/helpers.js';

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numberOfBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        icon={<HiOutlineBriefcase />}
        color='blue'
        value={numberOfBookings}
      />
      <Stat
        title='Sales'
        icon={<HiBanknotes />}
        color='green'
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        icon={<HiCalendarDays />}
        color='indigo'
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        icon={<HiOutlineChartBar />}
        color='yellow'
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}
