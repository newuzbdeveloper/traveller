import { Box, Button, Link, TextField, Typography } from '@mui/material';

function LoginForm() {
  const handleSubmit = () => {};
  return (
    <>
      <Typography textAlign="center" component="h1" variant="h2" mb={1}>
        Login.
      </Typography>
      <Typography textAlign="center" color="text.secondary">
        Login to access Traveller.
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login.
        </Button>
        <Box>
          <Typography>Don't you have an account yet?</Typography>
          <Link href="/sign-up" variant="body2">
            Sign Up.
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
