import PreviewImage1 from './assests/26 1.jpg';
import PreviewImage2 from './assests/26 2.jpg';
import PreviewImage3 from './assests/26 3.jpg';
import PreviewImage4 from './assests/26 4.jpg';
import PreviewImage5 from './assests/26 6.jpg';

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
