import { MAX_NUMBER_DESTINATIONS } from '../constants';
import Destinations from './components/steps/Destinations';
import Places from './components/steps/Places';
import TravelInfo from './components/steps/TravelInfo';
import { WizardSteps } from './types';

export const WIZARD_STEPS: WizardSteps[] = [
  {
    title: 'Travel information',
    description:
      'Describe your trip to always easily find it on your travel board',
    Component: TravelInfo,
  },
  {
    title: 'Destination',
    description: `Add where are you going to. You can add maximum ${MAX_NUMBER_DESTINATIONS} destinations.`,
    Component: Destinations,
  },
  {
    title: 'Places to visit',
    description:
      'Plan your perfect adventure with our curated list of must-visit places..',
    Component: Places,
  },
  {
    title: 'Expenses',
    description:
      'Easily enter details about each expense and stay organized and informed about where your money is going.',
    Component: TravelInfo,
  },
  {
    title: 'Documents',
    description: 'Upload documents that you need for your trip.',
    Component: TravelInfo,
  },
  {
    title: 'Packing list',
    description:
      'Plan what you will need to grab with you to a trip. Add up to 4 checklists.',
    Component: TravelInfo,
  },
  {
    title: 'Photos',
    description: 'Add your memories here!',
    Component: TravelInfo,
  },
];
