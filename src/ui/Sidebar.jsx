import styled from 'styled-components';

import Logo from './Logo.jsx';
import MainNav from './MainNav.jsx';
import Uploader from '../data/Uploader.jsx';

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 3.4rem;
  border: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}
