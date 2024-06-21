import { TripPreviewImage } from '../data';
import type { PreviewImage } from '../types';

export function usePreviewImageSrc(previewImage?: PreviewImage | null) {
  const previewImageSrc = previewImage?.templateImageId
    ? TripPreviewImage.find(
        (image) => image.id === previewImage?.templateImageId,
      )?.src
    : null;

  return previewImageSrc;
}
