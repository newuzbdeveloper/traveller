import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { AppRouter } from '@config/routes';
import { theme } from '@config/style';
import { useAuthStateChanges } from '@services/firebase';

export default function App() {
  useAuthStateChanges();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
