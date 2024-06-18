import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import AppButton from '@features/ui/AppButton';

import { useGetTripsQuery } from '../store/tripsApi';
import NoTrips from './NoTrips';
import TripsList from './TripsList';

export default function AllTrips() {
  const {
    data: trips,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTripsQuery();
  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && trips.length > 0) {
    return (
      <Box>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb={{ xs: 2, md: 3 }}
        >
          <Typography variant="h4" component="h1" sx={{ py: { xs: 1, md: 0 } }}>
            All Trips
          </Typography>
          <AppButton
            endIcon={<AddIcon />}
            LinkComponent={Link}
            href={AppRoutes.addTrip}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            Go Travel
          </AppButton>
        </Stack>
        <TripsList trips={trips} />
      </Box>
    );
  } else if (isSuccess && trips.length === 0) {
    return (
      <Stack
        justifyContent={{ xs: 'flex-start', md: 'center' }}
        alignItems="center"
        sx={{ width: '100%', height: { xs: 'auto', md: '100%' } }}
      >
        <NoTrips />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }
}
