import { useState } from 'react';

import { ButtonBase, Grid } from '@mui/material';

import FileUploadButton from '@features/trip/components/Files/FileUploadCard';
import { TripPreviewImage } from '@features/trip/data';
import AppDialog from '@features/ui/AppDialog';
import { useBreakpoints } from '@hooks/useBreakpoints';

import { Trip } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip['previewImage']) => void;
}

export default function PreviewImageDialog({ isOpen, onClose, onSave }: Props) {
  const [selectedImage, setSelectedImage] =
    useState<Trip['previewImage']>(null);

  const onSaveClick = () => onSave(selectedImage);
  const { md } = useBreakpoints();

  return (
    <AppDialog
      primaryButtonText={'Save'}
      title="Select your preview image"
      isOpen={isOpen}
      onClose={onClose}
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
              onClick={() => setSelectedImage({ templateImageId: image.id })}
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
          <FileUploadButton
            mainText="Upload preview photo"
            subText="PNG or PDF (max. 3MB)"
            sx={{ border: 4, borderColor: 'white' }}
            showSubtext={md}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
