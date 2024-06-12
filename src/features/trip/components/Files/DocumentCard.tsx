import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';

interface Props {
  name: string;
  url?: string | null;
  onFileRemoveClick: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
}

export default function DocumentCard({
  name,
  url,
  onFileRemoveClick,
  uploadProgress,
  isRemoving,
}: Props) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        border: 1,
        width: { xs: 170, md: 200 },
        height: 260,
        position: 'relative',
        borderColor: 'grey.200',
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

      <IconButton
        onClick={onFileRemoveClick}
        sx={{
          top: 8,
          right: 8,
          width: 'fit-content',
          position: 'absolute',
          opacity: uploadProgress ? 0.2 : 1,
        }}
        disabled={isRemoving}
      >
        {isRemoving ? <CircularProgress size={24} /> : <CloseIcon />}
      </IconButton>
      <Stack
        component={Link}
        href={isRemoving ? '' : url ?? '#'}
        target={isRemoving ? '_self' : '_blank'}
        rel="noopener noreferrer"
        sx={{
          gap: 1,
          width: '100%',
          height: '100%',
          p: 2,
          pt: 6,
          textDecoration: 'none',
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <Stack gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: '100%',
              height: { xs: 148, md: 133 },
              bgcolor: 'grey.100',
              borderRadius: 4,
            }}
          >
            <InsertDriveFileIcon sx={{ color: 'text.secondary' }} />
          </Stack>
          <Typography
            sx={{
              color: 'text.primary',
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-line-clamp': '1',
              'line-clamp': '1',
              '-webkit-box-orient': 'vertical',
            }}
          >
            {name}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
