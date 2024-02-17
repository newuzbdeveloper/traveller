import { useEffect } from 'react';

import { userLoaded, userLoggedOut } from '@features/auth/store/authSlice';
import { auth } from '@services/firebase';
import { useAppDispatch } from '@store/index';

export function useAuthStateChanges() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userLoaded({
            displayName: user.displayName,
            email: user.email ?? '',
            uid: user.uid,
          }),
        );
      } else {
        dispatch(userLoggedOut());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
