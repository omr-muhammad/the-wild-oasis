import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { HiEllipsisVertical, HiSquare2Stack } from 'react-icons/hi2';
import { BiPencil, BiTrash } from 'react-icons/bi';

import CreateCabinForm from './CreateCabinForm.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Table from '../../ui/Table.jsx';

import { useDeleteCabin } from './useDeleteCabin.js';
import { useCreateCabin } from './useCreateCabin.js';

import { formatCurrency } from '../../utils/helpers.js';
import Menus from '../../ui/Menus.jsx';
import Modal from '../../ui/Modal.jsx';
import { useIsAdmin } from '../authentication/useIsAdmin.js';
import toast from 'react-hot-toast';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { reset } = useForm();
  const isAdmin = useIsAdmin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin(cabinId, image);
  const { createCabin } = useCreateCabin(reset);

  function handleDuplicate() {
    if (!isAdmin) {
      toast.error('Only admins can do this action');
      return;
    }

    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.ToggleMenu menuId={cabinId}>
                <HiEllipsisVertical />
              </Menus.ToggleMenu>

              <Menus.List menuId={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.OpenButton toOpen='cabin-form'>
                  <Menus.Button icon={<BiPencil />}>Edit</Menus.Button>
                </Modal.OpenButton>

                <Modal.OpenButton toOpen='cabin-delete'>
                  <Menus.Button icon={<BiTrash />}>Delete</Menus.Button>
                </Modal.OpenButton>
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name='cabin-form'>
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Window name='cabin-delete'>
            <ConfirmDelete
              resourceName='cabins'
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId, image, isAdmin)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
