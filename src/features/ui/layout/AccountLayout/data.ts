import FlightIcon from '@mui/icons-material/Flight';
import HomeIcon from '@mui/icons-material/Home';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { AppRoutes } from '@config/routes/AppRoutes';

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  text: string;
  path: string;
}
export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: HomeIcon,
    text: 'Home',
    path: AppRoutes.dashboard,
  },
  {
    Icon: FlightIcon,
    text: 'Trips',
    path: AppRoutes.trips,
  },
];
