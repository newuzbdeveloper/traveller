import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from '@config/styles';
import { AppRouter } from '@config/styles/routes';
import { useAuthStateChanges } from '@services/firebase';

export default function App() {
  useAuthStateChanges();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
