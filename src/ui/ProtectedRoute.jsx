import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser.js';
import styled from 'styled-components';
import Spinner from './Spinner.jsx';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute() {
  const navigate = useNavigate();
  // Load the authenticated user
  const { isPending, isAuth } = useUser();

  // Show a spinner while loading
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If no Auth user redirect to /login
  if (!isAuth) navigate('/login');

  // If Auth user return <Outlet />
  if (isAuth) return <Outlet />;
}
