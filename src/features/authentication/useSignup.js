import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signUp as apiSignup } from '../../services/apiAuth.js';

export function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: apiSignup,
    mutationKey: ['signup'],
    onSuccess: () => {
      toast.success(
        "Account successfully created! Pleas verify the new account from the user's email address."
      );
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    signup: mutate,
    isSigningUp: isPending,
  };
}
