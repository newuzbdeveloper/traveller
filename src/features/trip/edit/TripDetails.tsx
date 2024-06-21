import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Breadcrumbs,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { AppRoutes } from '@config/routes';
import { Colors } from '@config/style/Colors';
import AppButton from '@features/ui/AppButton';

import {
  useGetTripDetailsQuery,
  useUpdateTripMutation,
} from '../store/tripsApi';
import type { Trip } from '../types';
import Hero from './Hero';
import TripTabs from './Tabs/TripTabs';

export default function TripDetails() {
  const [updateTrip] = useUpdateTripMutation();
  const { tripId } = useParams();

  const onTripUpdate = (data: Partial<Trip>) => {
    updateTrip({ id: trip!.id, data });
  };

  const {
    data: trip,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripDetailsQuery(tripId);

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return (
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={AppRoutes.trips}>
              Trips
            </Link>
            <Typography
              color={Colors.secondaryBlue}
              variant="subtitle2"
              aria-current="page"
            >
              {trip.name}
            </Typography>
          </Breadcrumbs>
          <AppButton endIcon={<DeleteIcon />} color="error">
            Delete
          </AppButton>
        </Stack>
        <Hero trip={trip} />
        <TripTabs trip={trip} onTripUpdate={onTripUpdate} />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }
}
