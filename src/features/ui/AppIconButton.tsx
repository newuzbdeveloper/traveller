import { Button, type SxProps, type Theme } from '@mui/material';

interface Props {
  onClick: () => void;
  'aria-label': string;
  children: JSX.Element;
  isSmall: boolean;
  sx: SxProps<Theme>;
}

function AppIconButton(props: Props) {
  return (
    <Button
      aria-label={props['aria-label']}
      onClick={props.onClick}
      variant="outlined"
      sx={{
        borderRadius: 2,
        width: props.isSmall ? 34 : 58,
        height: props.isSmall ? 34 : 58,
        minWidth: 'auto',
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
}

export default AppIconButton;
