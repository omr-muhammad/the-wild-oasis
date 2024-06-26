import styled from 'styled-components';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import { BiTrash } from 'react-icons/bi';

import { useCheckout } from '../check-in-out/useCheckout.js';
import { useDeleteBooking } from './useDeleteBooking.js';

import Table from '../../ui/Table';
import Menus from '../../ui/Menus.jsx';
import Tag from '../../ui/Tag';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Modal from '../../ui/Modal.jsx';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const isNotConfirmed = status === 'unconfirmed';
  const isCheckedIn = status === 'checked-in';
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.ToggleMenu menuId={bookingId}>
            <HiEllipsisVertical />
          </Menus.ToggleMenu>

          <Menus.List menuId={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {isNotConfirmed && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {isCheckedIn && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.OpenButton toOpen='booking-delete'>
              <Menus.Button icon={<BiTrash />} onClick>
                Delete
              </Menus.Button>
            </Modal.OpenButton>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='booking-delete'>
          <ConfirmDelete
            resourceName='bookings'
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
