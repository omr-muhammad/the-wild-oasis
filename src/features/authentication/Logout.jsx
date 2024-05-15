import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import ButtonIcon from '../../ui/ButtonIcon.jsx';
import { useLogout } from './useLogout.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
