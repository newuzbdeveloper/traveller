import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  ButtonBase,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import { Colors } from '@config/style/Colors';

interface Props {
  mainText: string;
  subText: string;
  sx?: SxProps<Theme>;
  showSubtext: boolean;
  onClick?: () => void;
}

export default function FileUploadCard({
  mainText,
  subText,
  sx,
  showSubtext,
  onClick,
}: Props) {
  return (
    <Box sx={{ height: '100%', width: '100%', ...sx }} onClick={onClick}>
      <ButtonBase
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          height: '100%',
          width: '100%',
          color: 'primary.main',
          px: 1,
          borderRadius: 4,
          bgcolor: Colors.lightGreen,
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23729E65FF' stroke-width='4' stroke-dasharray='10%2c 20' stroke-dashoffset='96' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <AddIcon fontSize="large" />
        <Typography component="span" variant="body2">
          {mainText}
        </Typography>
        {showSubtext && (
          <Typography
            component="span"
            variant="caption"
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {subText}
          </Typography>
        )}
      </ButtonBase>
    </Box>
  );
}
