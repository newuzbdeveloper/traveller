import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@features/auth/store/AuthSlice';

import { rtkQueryErrorLogger } from './middleware/errorMiddleWare';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});
