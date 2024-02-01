import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { Box, Link, TextField, Typography } from '@mui/material';

import { AppRoutes } from '@config/styles/routes/AppRoutes';
import AppButton from '@features/ui/AppButton';
import { auth } from '@services/firebase';
import { useAppDispatch, useAppSelector } from '@store/index';

import { registerUser } from '../store/authActions';
import { selectUser, setUserName } from '../store/authSlice';

interface FormInput {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
}

function SignUpForm() {
  const { control, handleSubmit, password, onSubmit } = useSignUpForm();
  const user = useAppSelector(selectUser);
  if (user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }
  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Please specify your name.' }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />
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

        <Controller
          name="passwordRepeat"
          control={control}
          rules={{
            required: 'Please confirm your password.',
            validate: (confirmpassword) =>
              confirmpassword != password
                ? 'Passwords does not match!'
                : undefined,
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="passwordRepeat"
              label="Password Repeat"
              autoComplete="passwordRepeat"
              type="password"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
              {...field}
            />
          )}
        />

        <AppButton type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Sign up.
        </AppButton>
        <Box display="flex" justifyContent="center">
          <Typography color="text.secondary" mr={1}>
            Do you have an account already?
          </Typography>
          <Link href={AppRoutes.login} variant="body2">
            Login.
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SignUpForm;

function useSignUpForm() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      passwordRepeat: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordRepeat: data.passwordRepeat,
      }),
    ).unwrap();
    dispatch(setUserName(auth.currentUser?.displayName));
  };

  return {
    control,
    handleSubmit,
    password,
    onSubmit,
  };
}
