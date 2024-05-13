import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookingDetails } from './useBookingDetails.js';
import Spinner from '../../ui/Spinner.jsx';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout.js';
import Modal from '../../ui/Modal.jsx';
import { useDeleteBooking } from './useDeleteBooking.js';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending } = useBookingDetails();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isPending) return <Spinner />;

  const { status, id: bookingId } = booking;
  const isNotConfirmed = status === 'unconfirmed';
  const isCheckedIn = status === 'checked-in';

  return (
    <Modal>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {isNotConfirmed && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {isCheckedIn && (
          <Button
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
              navigate('/bookings');
            }}
          >
            Check out
          </Button>
        )}

        <Modal.OpenButton toOpen='booking-delete'>
          <Button $variation='danger'>Delete</Button>
        </Modal.OpenButton>
        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name='booking-delete'>
        <ConfirmDelete
          resourceName='bookings'
          disabled={isDeleting}
          onConfirm={() =>
            deleteBooking(bookingId, {
              onSettled: () => navigate('/bookings'),
            })
          }
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
