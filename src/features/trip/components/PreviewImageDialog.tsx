import { useEffect, useRef, useState } from 'react';

import { ButtonBase, Grid } from '@mui/material';

import FileUploadButton from '@features/trip/components/Files/FileUploadCard';
import { TripPreviewImage } from '@features/trip/data';
import AppDialog from '@features/ui/AppDialog';
import { useBreakpoints } from '@hooks/useBreakpoints';
import useToast from '@hooks/useErrorToast';
import { useStorage } from '@services/firebase';

import { ACCEPTED_PHOTO_FORMATS } from '../constants';
import { PreviewImage, Trip } from '../types';
import PhotoCard from './Files/PhotoCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip['previewImage']) => void;
  onChange?: (previewImage: Trip['previewImage']) => void;
  defaultPreviewImage: PreviewImage | null;
  defaultPreviewImageSrc?: string | null;
}

export default function PreviewImageDialog({
  isOpen,
  onClose,
  onSave,
  onChange,
  defaultPreviewImage,
  defaultPreviewImageSrc,
}: Props) {
  const {
    uploadFiles,
    uploadProgresses,
    removeFile,
    isLoading,
    removingFilePath,
    uploadErrors,
    resetUpload,
  } = useStorage({
    onAllUploadSuccess: (uploadedFiles) => {
      if (uploadedFiles[0].storagePath) {
        onSave({ storagePath: uploadedFiles[0].storagePath });
      }
    },
  });

  const { showErrorMessage } = useToast();
  const uploadedFileRef = useRef<HTMLInputElement | null>(null);
  const [customImageFile, setCustomImageFile] = useState<null | File>();
  const [customPreviewImageSrc, setCustomPreviewImageSrc] = useState<
    string | null | undefined
  >(defaultPreviewImageSrc);
  const [selectedImage, setSelectedImage] =
    useState<Trip['previewImage']>(defaultPreviewImage);

  const onSaveClick = async () => {
    if (!selectedImage) {
      showErrorMessage('Please select a preview image.');
      return;
    }
    if (selectedImage.url && !selectedImage.storagePath && customImageFile) {
      uploadFiles('preview-image', [
        { fileName: customImageFile?.name, file: customImageFile },
      ]);
    } else if (
      selectedImage.templateImageId &&
      defaultPreviewImage?.storagePath
    ) {
      await removeFile(defaultPreviewImage.storagePath);
      onSave(selectedImage);
    } else {
      onSave(selectedImage);
    }
  };

  const onCustomFileUploadClick = () => {
    uploadedFileRef.current?.click();
  };

  const onCustomFileRemoveClick = async () => {
    const newSelectedPreviewImage = {
      templateImageId: TripPreviewImage[TripPreviewImage.length - 1].id,
    };
    setSelectedImage(newSelectedPreviewImage);
    if (defaultPreviewImage?.storagePath) {
      await removeFile(defaultPreviewImage.storagePath);
      onChange?.(newSelectedPreviewImage);
      setCustomPreviewImageSrc(null);
    } else {
      setCustomImageFile(null);
    }
  };

  const onTemplateImageClick = (imageId: string) => {
    if (!isLoading && !removingFilePath) {
      setSelectedImage({ templateImageId: imageId });
    }
  };

  const selectCustomPreviewImage = () => {
    if (customImageFile) {
      setSelectedImage({
        url: URL.createObjectURL(customImageFile),
      });
    } else if (defaultPreviewImage?.storagePath) {
      setSelectedImage(defaultPreviewImage);
    }
  };

  const onCancel = () => {
    setSelectedImage(defaultPreviewImage);
    onClose();
  };

  const onCustomFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageFile = event.target?.files?.[0];
    if (imageFile) {
      setCustomImageFile(event.target?.files?.[0]);
      setSelectedImage({ url: URL.createObjectURL(imageFile) });
    }
  };

  const { md } = useBreakpoints();

  useEffect(() => {
    if (uploadErrors[0]) {
      showErrorMessage(uploadErrors[0]);
      resetUpload();
    }
  }, [resetUpload, showErrorMessage, uploadErrors]);

  return (
    <AppDialog
      primaryButtonText={'Save'}
      title="Select your preview image"
      isOpen={isOpen}
      onClose={onCancel}
      isLoading={isLoading}
      onPrimaryButtonClick={onSaveClick}
    >
      <Grid container columns={{ xs: 2, md: 3 }} spacing={{ xs: 0.5, md: 1.5 }}>
        {TripPreviewImage.map((image) => (
          <Grid item xs={1} key={image.id}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: 4,
                borderColor:
                  selectedImage?.templateImageId === image.id
                    ? 'primary.main'
                    : 'white',
              }}
              onClick={() => onTemplateImageClick(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ width: '100%' }}
              />
            </ButtonBase>
          </Grid>
        ))}
        <Grid item xs={1}>
          {customImageFile ||
          (defaultPreviewImage?.storagePath && customPreviewImageSrc) ? (
            <PhotoCard
              src={
                customImageFile
                  ? URL.createObjectURL(customImageFile)
                  : defaultPreviewImageSrc
              }
              onFileRemoveClick={onCustomFileRemoveClick}
              uploadProgress={uploadProgresses[0]}
              isRemoving={Boolean(removingFilePath)}
              onClick={selectCustomPreviewImage}
              enableBorders
              borderColor={
                selectedImage?.url || selectedImage?.storagePath
                  ? 'primary.main'
                  : 'white'
              }
            />
          ) : (
            <>
              <FileUploadButton
                mainText="Upload preview photo"
                subText="PNG or PDF (max. 3MB)"
                sx={{ border: 4, borderColor: 'white' }}
                showSubtext={md}
                onClick={onCustomFileUploadClick}
              />
              <input
                ref={uploadedFileRef}
                type="file"
                id="fileInput"
                hidden
                accept={ACCEPTED_PHOTO_FORMATS}
                onChange={onCustomFileInputChange}
              />
            </>
          )}
        </Grid>
      </Grid>
    </AppDialog>
  );
}
