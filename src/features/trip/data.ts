import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import PreviewImage1 from './assests/26 1.jpg';
import PreviewImage2 from './assests/26 2.jpg';
import PreviewImage3 from './assests/26 3.jpg';
import PreviewImage4 from './assests/26 4.jpg';
import PreviewImage5 from './assests/26 6.jpg';
import { ExpenseCategory } from './types';

export interface TripPreviewImage {
  id: string;
  src: string;
  alt: string;
}

export const TripPreviewImage: TripPreviewImage[] = [
  {
    id: 'PreviewImage1',
    src: PreviewImage1,
    alt: 'Mountanins and lake with sunset.',
  },
  {
    id: 'PreviewImage2',
    src: PreviewImage2,
    alt: 'Sunrising in the village.',
  },
  {
    id: 'PreviewImage3',
    src: PreviewImage3,
    alt: 'Skycrapers in the city downtown.',
  },
  {
    id: 'PreviewImage4',
    src: PreviewImage4,
    alt: 'Women doing yoga and beatiful nature.',
  },
  {
    id: 'PreviewImage5',
    src: PreviewImage5,
    alt: 'A iceland in the middle of the ocean.',
  },
];

interface CategoryIconProps {
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  backgroundColor: string;
  color: string;
}
export const EXPENSE_ICON_BY_CATEGORY: Record<
  ExpenseCategory,
  CategoryIconProps
> = {
  Tickets: {
    icon: LocalActivityIcon,
    backgroundColor: 'rgba(165,189,158, 0.32)',
    color: '#729E65',
  },
  Food: {
    icon: RestaurantIcon,
    backgroundColor: 'rgba(126,169,195, 0.17)',
    color: '#5486A6',
  },
  Fun: {
    icon: EmojiEmotionsIcon,
    backgroundColor: 'rgba(255,201,153, 0.43)',
    color: '#E78835',
  },
  Hotel: {
    icon: HotelIcon,
    backgroundColor: 'rgba(156,19,25, 0.23)',
    color: '#810403',
  },
  Shopping: {
    icon: ShoppingBagIcon,
    backgroundColor: 'rgba(10,154,206, 0.21)',
    color: '#0A9ACE',
  },
  Other: {
    icon: PaymentsIcon,
    backgroundColor: 'rgba(87,95,101, 0.28)',
    color: '#37434B',
  },
};

// DO NOT MODIFY EXISTING IDS
// DO NOT REMOVE ITEMS, IT CAN AFFECT EXISTING USERS
interface ExpenseCategoryProps {
  id: number;
  category: ExpenseCategory;
}
export const EXPENSES_CATEGORIES: ExpenseCategoryProps[] = [
  {
    id: 1,
    category: 'Tickets',
  },
  {
    id: 2,
    category: 'Food',
  },
  {
    id: 3,
    category: 'Fun',
  },
  {
    id: 4,
    category: 'Hotel',
  },
  {
    id: 5,
    category: 'Shopping',
  },
  {
    id: 6,
    category: 'Other',
  },
];
