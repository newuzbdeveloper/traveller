import { Outlet, useLocation } from 'react-router-dom';

import LoginFormBackground from '@features/auth/assets/login.png';
import SignUpFormBackground from '@features/auth/assets/signup.png';
import { Box, Grid } from '@mui/material';

import Logo from '../logo/logo';

export default function AuthLayout() {
  const location = useLocation();
  const isLoadingPage = location.pathname == '/login';
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${
            isLoadingPage ? LoginFormBackground : SignUpFormBackground
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopRightRadius: '56px',
          borderBottomRightRadius: '56px',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            maxWidth: 552,
          }}
        >
          <Box mb={4}>
            <Logo />
          </Box>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
