import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { AppRouter } from '@config/routes';
import { theme } from '@config/style';
import Loader from '@features/ui/Loader';
import { useAuthStateChanges } from '@services/firebase';

import { persistor } from './store';

export default function App() {
  useAuthStateChanges();
  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </PersistGate>
  );
}
