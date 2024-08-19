import { LoadingButton } from '@mui/lab';
import { type SxProps, type Theme, Typography } from '@mui/material';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  children: React.ReactNode;
  LinkComponent?: React.ElementType;
  loading?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  href?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  isSmall?: boolean;
  color?:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning';
}

function AppButton({
  type = 'button',
  variant = 'contained',
  fullWidth,
  children,
  loading,
  LinkComponent,
  href,
  endIcon,
  startIcon,
  onClick,
  disabled,
  color,
  isSmall,
  sx,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={LinkComponent}
      loading={loading}
      endIcon={endIcon}
      startIcon={startIcon}
      href={href}
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      color={color}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        height: {
          xs: variant === 'text' || isSmall ? 48 : 56,
          md: variant === 'text' || isSmall ? 48 : 56,
        },
        width: fullWidth ? '100%' : 'fit-content',
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
