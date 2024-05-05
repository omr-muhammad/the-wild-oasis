import Button from './Button.jsx';
import Modal from './Modal.jsx';

// The toOpen & name props to handle rendering one of the modals if there is more than one

export default function CompoundModal({ btnTxt, Component, toOpen, name }) {
  return (
    <Modal>
      <Modal.OpenButton
        toOpen={toOpen}
        render={(openModal) => {
          if (typeof btnTxt === 'string')
            return <Button onClick={openModal}>{btnTxt}</Button>;

          return <button onClick={openModal}>{btnTxt}</button>;
        }}
      />
      <Modal.Window name={name} render={(close) => Component(close)} />
    </Modal>
  );
}
