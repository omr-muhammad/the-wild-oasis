import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick.js';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  transition: position 10ms linear;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openMenuId, setOpenMenuId] = useState('');
  const [position, setPosition] = useState(null);

  const open = (id) => setOpenMenuId(id);
  const close = setOpenMenuId;

  return (
    <MenusContext.Provider
      value={{
        openMenuId,
        open,
        close,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function ToggleMenu({ menuId, children }) {
  const ref = useRef(null);
  const { openMenuId, open, close, setPosition } = useContext(MenusContext);

  useEffect(() => {
    function handleScroll() {
      if (menuId === openMenuId) {
        const rect = ref.current.getBoundingClientRect();

        setPosition({
          x: window.innerWidth - rect.x - rect.width,
          y: rect.y + rect.height + 8,
        });
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuId, openMenuId, setPosition]);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });

    openMenuId === '' || menuId !== openMenuId ? open(menuId) : close('');
  }

  return (
    <StyledToggle ref={ref} onClick={handleClick}>
      {children}
    </StyledToggle>
  );
}

function List({ children, menuId }) {
  const { openMenuId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(() => close(''), false);

  if (menuId !== openMenuId) return null;

  return createPortal(
    <StyledList ref={ref} $position={{ x: position.x, y: position.y }}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    close('');
    onClick?.();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.ToggleMenu = ToggleMenu;
Menus.List = List;
Menus.Button = Button;
