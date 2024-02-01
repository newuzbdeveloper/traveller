import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@features/auth/store/authSlice';

import { rtkQueryErrorLogger } from './middleware/errorMiddleWare';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware().concat(rtkQueryErrorLogger),
});
