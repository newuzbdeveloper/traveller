import DocumentsUploadForm from '@features/trip/components/Files/DocumentsUploadForm';
import { TripFile } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setDocumentsInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

export default function Documents() {
  const { onSubmit, documents, onChange } = useDocumentsForm();
  return (
    <>
      <DocumentsUploadForm
        defaultFiles={documents}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination />}
        onChange={onChange}
      />
    </>
  );
}

function useDocumentsForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = (data: TripFile[]) => {
    dispatch(setDocumentsInfo(data));
    dispatch(nextStep());
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setDocumentsInfo(data));
  };

  return {
    onSubmit,
    documents: trip.documents,
    onChange,
  };
}
