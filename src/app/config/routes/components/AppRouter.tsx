import { Route, Routes } from 'react-router-dom';

import AccountLayout from '@features/ui/layout/AccountLayout/AccountLayout';
import AuthLayout from '@features/ui/layout/AuthLayout';
import AddTripPage from '@pages/account/addTrip';
import Dashboard from '@pages/account/dashboard';
import TripsPage from '@pages/account/trips';
import HomePage from '@pages/home';
import LoginPage from '@pages/login';
import NotFoundPage from '@pages/not-found';
import SignUpPage from '@pages/sign-up';

import { AppRoutes } from '../AppRoutes';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/* Account Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={AppRoutes.dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.trips} element={<TripsPage />} />
        <Route path={AppRoutes.addTrip} element={<AddTripPage />} />
      </Route>
      {/*Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
