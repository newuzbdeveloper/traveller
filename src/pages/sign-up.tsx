import { Typography } from '@mui/material';

import SignUpForm from '@features/auth/components/SignUpForm';

function SignUpPage() {
  return (
    <>
      <Typography textAlign="center" component="h1" variant="h2" mb={1}>
        Sign Up.
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={4}>
        Become a user of Traveller.
      </Typography>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
