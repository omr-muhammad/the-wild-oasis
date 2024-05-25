import { ADMIN_USER_ID } from '../../utils/constants.js';
import { useUser } from './useUser.js';

export function useIsAdmin() {
  const { user } = useUser();

  return user.id === ADMIN_USER_ID;
}
