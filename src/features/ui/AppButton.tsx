import React from 'react';

import { Button, type SxProps, type Theme, Typography } from '@mui/material';

interface Props {
  type: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  children: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

function AppButton({ type, variant, fullWidth, children, sx }: Props) {
  return (
    <Button
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
    </Button>
  );
}

export default AppButton;
