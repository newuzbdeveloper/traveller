import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';

import { useBreakpoints } from '@hooks/useBreakpoints';

import AppButton from './AppButton';

interface Props {
  primaryButtonText: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryButtonClick: () => void;
  children: React.ReactNode;
  isForm: boolean;
  maxWidth?: number;
}

const DESKTOP_PADDING_X = 4;
const MOBILE_PADDING_X = 2;
const DESKTOP_PADDING_Y = 5;
const MOBILE_PADDING_Y = 3;

export default function AppDialog({
  title,
  primaryButtonText,
  isOpen,
  onClose,
  onPrimaryButtonClick,
  children,
  isForm,
  maxWidth,
}: Props) {
  const { md } = useBreakpoints();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullScreen={!md}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: { md: 864 },
          maxWidth: maxWidth ?? 'inherit',
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 24,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon fontSize="large" sx={{ color: 'text.primary' }} />
      </IconButton>
      <Typography
        sx={{
          pt: 8.75,
          px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
          pb: 3,
          textAlign: 'center',
        }}
        variant="h4"
      >
        {title}
      </Typography>
      <Box component={isForm ? 'form' : 'div'}>
        <DialogContent
          sx={{ px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X }, py: 0 }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
            pb: { xs: MOBILE_PADDING_Y, md: DESKTOP_PADDING_Y },
            pt: 3,
            position: { xs: 'fixed', md: 'static' },
            bottom: 0,
            width: '100%',
          }}
        >
          <AppButton
            type={isForm ? 'submit' : 'button'}
            fullWidth
            onClick={onPrimaryButtonClick}
          >
            {primaryButtonText}
          </AppButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
