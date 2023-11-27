import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { Box, Link, TextField, Typography } from '@mui/material';

import { AppRoutes } from '@config/styles/routes/AppRoutes';
import AppButton from '@features/ui/AppButton';

interface FormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Please specify your email address.' }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Please specify your password.' }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
              {...field}
            />
          )}
        />

        <AppButton type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Login.
        </AppButton>
        <Box display="flex" justifyContent="center">
          <Typography color="text.secondary" mr={1}>
            Don't you have an account yet?
          </Typography>
          <Link href={AppRoutes.signUp} variant="body2">
            Sign Up.
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
