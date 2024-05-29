import { useDispatch } from 'react-redux';

import DocumentsUploadForm from '@features/trip/components/Files/DocumentsUploadForm';
import { TripFile } from '@features/trip/types';
import { useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setDocumentsInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

export default function Documents() {
  const { onSubmit, documents } = useDocumentsForm();
  return (
    <>
      <DocumentsUploadForm
        defaultFiles={documents}
        onSubmit={onSubmit}
        SubmitComponent={<Pagination />}
      />
    </>
  );
}

function useDocumentsForm() {
  const dispatch = useDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = (data: TripFile[]) => {
    dispatch(setDocumentsInfo(data));
    dispatch(nextStep());
    console.log(data, 'data1');
  };

  return {
    onSubmit,
    documents: trip.documents,
  };
}
