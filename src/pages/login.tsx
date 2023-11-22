import { Typography } from '@mui/material';

import LoginForm from '@features/auth/components/LoginForm';

function LoginPage() {
  return (
    <>
      <Typography textAlign="center" component="h1" variant="h2" mb={1}>
        Login.
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={4}>
        Login to acces Traveller.
      </Typography>
      <LoginForm />
    </>
  );
}

export default LoginPage;
