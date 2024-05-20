import styled from 'styled-components';

import { useRecentStays } from './useRecentStays.js';
import { useRecentBookings } from './useRecentBookings.js';
import { useCabins } from '../cabins/useCabins.js';

import Spinner from '../../ui/Spinner.jsx';
import Stats from './Stats.jsx';
import SalesChart from './SalesChart.jsx';
import DurationChart from './DurationChart.jsx';
import TodayActivity from '../check-in-out/TodayActivity.jsx';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoadingStays, numsOfDays } = useRecentStays();
  const { cabins, isLoadingCabin } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabin) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numsOfDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numsOfDays} />
    </StyledDashboardLayout>
  );
}
