import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from '@config/styles';
import { AppRouter } from '@config/styles/routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
