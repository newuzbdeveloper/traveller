import { theme } from '@config/styles';
import { AppRouter } from '@config/styles/routes';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}
