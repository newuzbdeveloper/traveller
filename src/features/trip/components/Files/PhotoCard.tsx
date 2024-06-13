import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Link, Stack } from '@mui/material';

import AppIconButton from '@features/ui/AppIconButton';
import { useBreakpoints } from '@hooks/useBreakpoints';

interface Props {
  src?: string | null;
  onFileRemoveClick: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
}

export default function PhotoCard({
  src,
  onFileRemoveClick,
  uploadProgress,
  isRemoving,
}: Props) {
  const { md } = useBreakpoints();
  return (
    <Box
      sx={{
        borderRadius: 4,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: 'absolute',
            left: 'calc(50% - 1.25rem)',
            top: 'calc(50% - 1.25rem)',
          }}
        />
      )}

      <AppIconButton
        variant="contained"
        isSmall={!md}
        aria-label="photo remove"
        onClick={onFileRemoveClick}
        sx={{
          top: 12,
          right: 12,
          position: 'absolute',
          opacity: uploadProgress ? 0.2 : 1,
        }}
        disabled={isRemoving}
        isLoading={isRemoving}
      >
        <CloseIcon fontSize={md ? 'medium' : 'small'} />
      </AppIconButton>
      <Stack
        component={Link}
        href={isRemoving ? '' : src ?? '#'}
        target={isRemoving ? '_self' : '_blank'}
        rel="noopener noreferrer"
        sx={{
          gap: 1,
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <img
          src={src ?? ''}
          alt="custom photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Stack>
    </Box>
  );
}
