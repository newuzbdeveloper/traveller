import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { AppRouter } from '@config/routes';
import { theme } from '@config/style';
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
