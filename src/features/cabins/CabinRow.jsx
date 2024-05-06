import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { HiSquare2Stack } from 'react-icons/hi2';
import { BiPencil, BiTrash } from 'react-icons/bi';

import CreateCabinForm from './CreateCabinForm.jsx';
import CompoundModal from '../../ui/CompoundModal.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Table from '../../ui/Table.jsx';

import { useDeleteCabin } from './useDeleteCabin.js';
import { useCreateCabin } from './useCreateCabin.js';

import { formatCurrency } from '../../utils/helpers.js';

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
  const { isCreating, createCabin } = useCreateCabin(reset);

  function handleDuplicate() {
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
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>

        <CompoundModal
          toOpen='cabin-form'
          Component={(close) => (
            <CreateCabinForm cabin={cabin} onCloseModal={close} />
          )}
          name='cabin-form'
          btnTxt={<BiPencil />}
          cabin={cabin}
        />

        <CompoundModal
          name='cabin-delete'
          toOpen='cabin-delete'
          btnTxt={<BiTrash />}
          Component={(close) => (
            <ConfirmDelete
              resourceName='cabins'
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
              onCloseModal={close}
            />
          )}
        />
      </div>
    </Table.Row>
  );
}
