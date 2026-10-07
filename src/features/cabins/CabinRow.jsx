import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
// import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiDocumentDuplicate, HiPencil, HiTrash } from 'react-icons/hi';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

// Styled CSS
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

// CabinRaw starts here
function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id, name, maxCapacity, regularPrice, discount, description, image } =
    cabin;

  // Crate a duplicate cabin
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
    <TableRow role='role'>
      <img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiDocumentDuplicate />
        </button>

        <Modal>
          <Modal.Open opens='edit'>
            {/* <button onClick={() => setShowForm((show) => !show)}> */}
            <button>
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          {/* Delete button */}
          <Modal.Open opens='delete'>
            {/* <button onClick={() => deleteCabin(id)} disabled={isDeleting}> */}
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='cabins'
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </TableRow>
  );
}

export default CabinRow;
