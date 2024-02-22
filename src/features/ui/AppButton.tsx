import { LoadingButton } from '@mui/lab';
import { type SxProps, type Theme, Typography } from '@mui/material';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  children: React.ReactNode;
  linkcomponent?: React.ElementType;
  loading?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  href?: string;
  endIcon?: React.ReactNode;
}

function AppButton({
  type = 'button',
  variant = 'contained',
  fullWidth,
  children,
  loading,
  linkcomponent,
  href,
  endIcon,
  onClick,
  sx,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={linkcomponent}
      loading={loading}
      endIcon={endIcon}
      href={href}
      onClick={onClick}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        height: { xs: 48, md: 56 },
        ...sx,
      }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </LoadingButton>
  );
}

export default AppButton;
