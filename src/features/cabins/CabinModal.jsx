import CompoundModal from '../../ui/CompoundModal.jsx';
import CabinTable from './CabinTable.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

export default function CabinModal() {
  return (
    <>
      <CompoundModal
        btnTxt='Add new Cabin'
        Component={CreateCabinForm}
        toOpen='cabin-form'
        name='cabin-form'
      />
      <CompoundModal
        btnTxt='Show table'
        Component={CabinTable}
        toOpen='table'
        name='table'
      />
    </>
  );
}
