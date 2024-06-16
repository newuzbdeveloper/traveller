import { type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import PackingListsForm from '@features/trip/components/PackingListsForm';
import { Trip } from '@features/trip/types';
import { useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setPackingListsInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

interface FormInput {
  packingLists: Trip['packingLists'];
}

export default function PackingLists() {
  const { onSubmit, packingLists } = usePackingListsForm();
  return (
    <>
      <PackingListsForm
        defaultPackingLists={packingLists}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination />}
      />
    </>
  );
}

function usePackingListsForm() {
  const dispatch = useDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPackingListsInfo(data.packingLists));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    packingLists: trip.packingLists,
  };
}
