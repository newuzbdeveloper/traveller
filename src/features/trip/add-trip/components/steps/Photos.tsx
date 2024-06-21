import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@config/routes';
import DocumentsUploadForm from '@features/trip/components/Files/DocumentsUploadForm';
import { useAddTripMutation } from '@features/trip/store/tripsApi';
import { TripFile } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  resetWizard,
  selectWizardTrip,
  setPhotosInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

export default function Photos() {
  const { onSubmit, photos, onChange, isLoading } = usePhotosForm();
  return (
    <>
      <DocumentsUploadForm
        defaultFiles={photos}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination isLoading={isLoading} />}
        onChange={onChange}
        type="photo"
      />
    </>
  );
}

function usePhotosForm() {
  const [addTrip, { isLoading }] = useAddTripMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = async (data: TripFile[]) => {
    if (isLoading) {
      return;
    }
    dispatch(setPhotosInfo(data));
    const result = await addTrip({ ...trip, photos: data });
    if (!('error' in result)) {
      navigate(AppRoutes.trips);
      dispatch(resetWizard());
    }
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setPhotosInfo(data));
  };

  return {
    onSubmit,
    photos: trip.photos,
    onChange,
    isLoading,
  };
}
