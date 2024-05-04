import { type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import PlacesForm from '@features/trip/components/PlacesFrom';
import { Trip } from '@features/trip/types';
import { useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setPlacesInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

interface FormInput {
  places: Trip['places'];
}

export default function Places() {
  const { onSubmit, places } = usePlacesForm();
  return (
    <>
      <PlacesForm
        defaultPlaces={places}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination />}
      />
    </>
  );
}

function usePlacesForm() {
  const dispatch = useDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPlacesInfo(data.places));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    places: trip.places,
  };
}
