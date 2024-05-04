import Button from './Button.jsx';
import Modal from './Modal.jsx';

// The toOpen & name props to handle rendering one of the modals if there is more than one

export default function CompoundModal({ btnTxt, Component, toOpen, name }) {
  return (
    <Modal>
      <Modal.OpenButton
        toOpen={toOpen}
        render={(openModal) => <Button onClick={openModal}>{btnTxt}</Button>}
      />
      <Modal.Window
        name={name}
        render={(close) => <Component onCloseModal={close} />}
      />
    </Modal>
  );
}
