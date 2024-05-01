import { useState } from 'react';

import { ButtonBase, Grid } from '@mui/material';

import FileUploadButton from '@features/trip/components/FileUploadButton';
import { TripPreviewImage } from '@features/trip/data';
import AppDialog from '@features/ui/AppDialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewImageDialog({ isOpen, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState<null | TripPreviewImage>(
    null,
  );

  return (
    <AppDialog
      primaryButtonText={'Save'}
      title="Select your preview image"
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={function (): void {
        throw new Error('Function not implemented.');
      }}
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
                  selectedImage?.id === image.id ? 'primary.main' : 'white',
              }}
              onClick={() => setSelectedImage(image)}
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
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
