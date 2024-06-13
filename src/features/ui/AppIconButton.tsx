import { LoadingButton } from '@mui/lab';
import { type SxProps, type Theme } from '@mui/material';

interface Props {
  onClick: () => void;
  'aria-label': string;
  children: JSX.Element;
  isSmall?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  variant?: 'outlined' | 'contained';
  isLoading?: boolean;
}

function AppIconButton(props: Props) {
  return (
    <LoadingButton
      aria-label={props['aria-label']}
      onClick={props.onClick}
      variant={props.variant ?? 'outlined'}
      disabled={props.disabled}
      loading={props.isLoading}
      sx={{
        borderRadius: 2,
        width: { xs: props.isSmall ? 34 : 48, md: props.isSmall ? 34 : 58 },
        height: { xs: props.isSmall ? 34 : 48, md: props.isSmall ? 34 : 58 },
        minWidth: 'auto',
        ...props.sx,
      }}
    >
      {props.children}
    </LoadingButton>
  );
}

export default AppIconButton;
