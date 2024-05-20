import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini.jsx';
import { useCheckout } from './useCheckout.js';

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      onClick={() => checkout(bookingId)}
      $variation='primary'
      $size='small'
    >
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </Button>
  );
}

export default CheckoutButton;
