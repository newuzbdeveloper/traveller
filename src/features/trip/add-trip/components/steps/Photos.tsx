import DocumentsUploadForm from '@features/trip/components/Files/DocumentsUploadForm';
import { TripFile } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import { selectWizardTrip, setPhotosInfo } from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

export default function Photos() {
  const { onSubmit, photos, onChange } = usePhotosForm();
  return (
    <>
      <DocumentsUploadForm
        defaultFiles={photos}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination />}
        onChange={onChange}
        type="photo"
      />
    </>
  );
}

function usePhotosForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = (data: TripFile[]) => {
    dispatch(setPhotosInfo(data));
    //ToDo
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setPhotosInfo(data));
  };

  return {
    onSubmit,
    photos: trip.photos,
    onChange,
  };
}
