import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookingDetails } from '../bookings/useBookingDetails.js';
import { useCheckin } from './useCheckin.js';
import { useSettings } from '../settings/useSettings.js';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import Spinner from '../../ui/Spinner.jsx';
import Checkbox from '../../ui/Checkbox.jsx';

import { formatCurrency } from '../../utils/helpers.js';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isoptionalBreakfast, setIsOptionalBreakfast] = useState(false);
  const { booking, isPending: isBookingPending } = useBookingDetails();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsPending } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => setIsConfirmed(booking?.isPaid ?? false), [booking?.isPaid]);

  if (isBookingPending || isSettingsPending) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!isConfirmed) return;

    if (isoptionalBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optBreakfastPrice,
          totalPrice: optBreakfastPrice + totalPrice,
        },
      });
      return;
    }

    checkin({ bookingId, breakfast: {} });
  }

  function handleBreakfastChange() {
    setIsOptionalBreakfast((current) => !current);
    setIsConfirmed(false);
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            checked={isoptionalBreakfast}
            onChange={handleBreakfastChange}
          >
            Want to add breakfast for {formatCurrency(optBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isConfirmed}
          onChange={() => setIsConfirmed((current) => !current)}
          id='confirmed'
          disabled={isConfirmed}
        >
          I confirmed that {guests.fullName} have paid the total amount of{' '}
          {isoptionalBreakfast
            ? `${formatCurrency(
                optBreakfastPrice + totalPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!isConfirmed || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
