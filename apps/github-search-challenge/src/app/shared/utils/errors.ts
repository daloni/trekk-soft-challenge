import { toast } from 'react-toastify';

export const showErrorMessage: (error: Error) => void = (error: Error) => {
  toast(error.message, { type: 'error' });
};
