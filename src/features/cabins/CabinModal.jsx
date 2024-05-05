import CompoundModal from '../../ui/CompoundModal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

export default function CabinModal() {
  return (
    <div>
      <CompoundModal
        btnTxt='Add new Cabin'
        Component={(close) => <CreateCabinForm onCloseModal={close} />}
        toOpen='cabin-form'
        name='cabin-form'
      />
    </div>
  );
}
