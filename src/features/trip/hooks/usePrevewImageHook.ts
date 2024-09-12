import { useEffect, useState } from 'react';

import { getDownloadURL } from '@services/firebase';

import { TripPreviewImage } from '../data';
import type { PreviewImage } from '../types';

export function usePreviewImageSrc(previewImage?: PreviewImage | null) {
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>();
  useEffect(() => {
    const fetchPreviewImage = async () => {
      const fetchedPreviewImageSrc = await getPreviewImageSrc(previewImage);
      setPreviewImageSrc(fetchedPreviewImageSrc);
    };
    fetchPreviewImage();
  }, [previewImage]);
  return previewImageSrc;
}

async function getPreviewImageSrc(previewImage?: PreviewImage | null) {
  let previewImageSrc = null;
  if (previewImage?.templateImageId) {
    previewImageSrc = previewImage?.templateImageId
      ? TripPreviewImage.find(
          (image) => image.id === previewImage?.templateImageId,
        )?.src
      : null;
  } else if (previewImage?.storagePath) {
    previewImageSrc = getDownloadURL(previewImage.storagePath);
  }

  return previewImageSrc;
}
