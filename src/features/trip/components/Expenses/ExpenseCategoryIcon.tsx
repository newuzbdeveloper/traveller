import { Box, ButtonBase } from '@mui/material';

import { ExpenseCategory } from '@features/trip/types';

interface Props {
  onClick?: () => void;
  color: string;
  backgroundColor: string;
  borderColor: string;
  children: React.ReactNode;
  category: ExpenseCategory;
  isSmall?: boolean;
}
export default function ExpenseCategoryIcon({
  onClick,
  color,
  backgroundColor,
  borderColor,
  children,
  isSmall,
}: Props) {
  return (
    <Box
      component={onClick ? ButtonBase : Box}
      onClick={onClick}
      sx={{
        width: isSmall ? 40 : 75,
        height: isSmall ? 40 : 75,
        color: { color },
        backgroundColor: { backgroundColor },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        border: onClick ? 3 : 0,
        borderColor: { borderColor },
      }}
    >
      {children}
    </Box>
  );
}
