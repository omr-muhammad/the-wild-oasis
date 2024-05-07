import Button from '../../ui/Button.jsx';
import Modal from '../../ui/Modal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

export default function CabinModal() {
  return (
    <div>
      <Modal>
        <Modal.OpenButton toOpen='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.OpenButton>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
