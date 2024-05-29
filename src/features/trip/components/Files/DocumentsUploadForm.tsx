import { Fragment, useEffect, useRef } from 'react';
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import { Stack } from '@mui/material';

import { MAX_FILE_SIZE_MB } from '@features/trip/constants';
import type { FilesToUpload, TripFile } from '@features/trip/types';
import useErrorToast from '@hooks/useErrorToast';
import { getDownloadUrl, useUploadFiles } from '@services/firebase';

import DocumentCard from './DocumentCard';
import FileUploadCard from './FileUploadCard';

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  files: FilesToUpload[];
}

export default function DocumentsUploadForm(props: Props) {
  const {
    onSubmit,
    handleSubmit,
    control,
    onFileInputChange,
    files,
    onFileRemove,
    fileInputRef,
    onFileAdd,
    uploadProgress,
  } = useDocUploadForm(props);

  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
        gap={2}
        flexDirection="row"
        flexWrap="wrap"
      >
        <FileUploadCard
          onClick={onFileAdd}
          mainText="Upload document"
          subText={`PNG or PDF (max. ${MAX_FILE_SIZE_MB}MB)`}
          showSubtext
          sx={{
            border: 4,
            borderColor: 'white',
            width: { xs: '100%', md: 200 },
            height: { xs: 140, md: 270 },
          }}
        />

        {files.map((file, index) => {
          const showCard = Boolean(file?.url || file.storagePath);

          return (
            <Fragment key={file.fileName}>
              {showCard && (
                <DocumentCard
                  name={file.fileName}
                  url={file.url}
                  onFileRemoveClick={() => onFileRemove(index)}
                  uploadProgress={uploadProgress[index]}
                />
              )}
              <Controller
                name={`files.${index}`}
                control={control}
                rules={{ required: 'Please specify your trip name.' }}
                render={({ field }) => (
                  <input
                    type="file"
                    ref={index === files.length - 1 ? fileInputRef : null}
                    id="inputFile"
                    hidden
                    onChange={(event) => {
                      onFileInputChange(event, field.onChange);
                    }}
                  />
                )}
              />
            </Fragment>
          );
        })}
        {props.SubmitComponent}
      </Stack>
    </>
  );
}

function useDocUploadForm(props: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { showErrorMessage } = useErrorToast();

  const { filesUpload, uploadProgress } = useUploadFiles({
    onAllUploadedFiles: (uploadedFiles) => {
      props.onSubmit(uploadedFiles);
    },
  });

  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      files: props.defaultFiles,
    },
  });

  const { remove, append, update } = useFieldArray({
    control,
    name: 'files',
  });

  const onFileRemove = (index: number) => {
    remove(index);
  };

  const onFileAdd = () => {
    if (files.length === 0 || files[files.length - 1]?.fileName) {
      append({ fileName: '' });
    }

    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: FilesToUpload) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (files.find((existingFile) => existingFile.fileName === file.name)) {
      if (!files[files.length - 1].fileName) {
        onFileRemove(files.length - 1);
      }
      return showErrorMessage('You have entered a file with same name!');
    }

    onChange({
      fileName: file?.name,
      file,
      url: URL.createObjectURL(file),
    });
  };

  const files = watch('files');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const filteredFiles = [...data.files];
    if (!filteredFiles[filteredFiles.length - 1]?.fileName) {
      filteredFiles.pop();
    }
    filesUpload('documents', filteredFiles);
  };

  useEffect(
    () =>
      files.forEach(async (file, index) => {
        if (!file.url && file.storagePath) {
          const url = await getDownloadUrl(file.storagePath);
          if (url) {
            update(index, {
              ...files[index],
              url,
            });
          }
        }
      }),
    [files, update],
  );

  return {
    onSubmit,
    handleSubmit,
    files,
    control,
    onFileInputChange,
    onFileRemove,
    fileInputRef,
    onFileAdd,
    uploadProgress,
  };
}
