import { useSnackbar } from 'notistack';

export default function useErrorToast() {
  const { enqueueSnackbar } = useSnackbar();
  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  return { showErrorMessage };
}
