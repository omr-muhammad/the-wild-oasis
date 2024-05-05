import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// 4 Steps to Create Compound Component

// 1) Create Context
const ModalContext = createContext();

// 2) Create The Parent Component
export default function Modal({ children }) {
  // Creating the state to handle the opened Window by name
  const [name, setName] = useState('');

  const closeModal = () => setName('');
  const openModal = (name) => setName(name);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        openedModalName: name,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function OpenButton({ toOpen, render }) {
  const { openModal } = useContext(ModalContext);

  return render(() => openModal(toOpen));
}

function Window({ render, name }) {
  const { openedModalName, closeModal } = useContext(ModalContext);

  if (name !== openedModalName) return null;

  const children = render(closeModal);

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return createPortal(
    <Overlay onClick={handleClick}>
      <StyledModal>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.OpenButton = OpenButton;
Modal.Window = Window;
