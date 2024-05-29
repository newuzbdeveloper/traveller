import { ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { selectUser } from '@features/auth/store/authSlice';
import { FilesToUpload, TripFile } from '@features/trip/types';
import { useAppSelector } from '@store/index';

import { storage } from '../firebase';

interface Props {
  onAllUploadedFiles: (uploadedFiles: TripFile[]) => void;
}

export function useUploadFiles({ onAllUploadedFiles }: Props) {
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<{
    uploadProgress: (number | undefined)[];
    uploadError: string[];
    uploadedFiles: TripFile[];
    totalFilesCount: number;
    uploadedFilesCount: number;
  }>({
    uploadProgress: [],
    uploadError: [],
    uploadedFiles: [],
    totalFilesCount: 0,
    uploadedFilesCount: 0,
  });

  useEffect(() => {
    if (
      state.totalFilesCount > 0 &&
      state.uploadedFilesCount === state.totalFilesCount
    ) {
      onAllUploadedFiles(state.uploadedFiles);
    }
  }, [
    onAllUploadedFiles,
    state.totalFilesCount,
    state.uploadedFiles,
    state.uploadedFilesCount,
  ]);

  const filesUpload = (path: string, files: FilesToUpload[]) => {
    files.forEach((file, index) => {
      if (!file?.file) {
        return;
      }

      const storageRef = ref(
        storage,
        `user-data/${user?.uid}/${path}/${file.fileName}`,
      );

      const uploadTask = uploadBytesResumable(storageRef, file.file);

      setState((prev) => ({ ...prev, totalFilesCount: files.length }));

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const newProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgress];
            newProgresses[index] = newProgress;
            return { ...prevState, uploadProgress: newProgresses };
          });
        },
        (error) => {
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgress];
            newProgresses[index] = undefined;

            const newErrors = [...prevState.uploadError];
            newErrors[index] = `Something went wrong: ${error.message}`;
            return {
              ...prevState,
              uploadProgress: newProgresses,
              uploadError: newErrors,
            };
          });
        },
        () => {
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgress];
            newProgresses[index] = undefined;

            const newUploadedFiles = [...prevState.uploadedFiles];
            newUploadedFiles[index] = {
              fileName: file.fileName,
              storagePath: uploadTask.snapshot.ref.fullPath,
            };
            return {
              ...prevState,
              uploadedFiles: newUploadedFiles,
              uploadProgress: newProgresses,
              uploadedFilesCount: ++prevState.uploadedFilesCount,
            };
          });
        },
      );
    });
  };
  return { ...state, filesUpload };
}
