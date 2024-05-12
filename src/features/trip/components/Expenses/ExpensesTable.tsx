import { useEffect, useRef } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { EXPENSE_ICON_BY_CATEGORY } from '@features/trip/data';
import { Trip } from '@features/trip/types';
import AppIconButton from '@features/ui/AppIconButton';
import { useBreakpoints } from '@hooks/useBreakpoints';

import ExpenseCategoryIcon from './ExpenseCategoryIcon';

interface Props {
  expenses: Trip['expenses'];
  onDelete: (expenseId: string) => void;
}
export default function ExpensesTable({ expenses, onDelete }: Props) {
  const { md } = useBreakpoints();

  const bottomBoxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (bottomBoxRef.current) {
      bottomBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [expenses]);
  return (
    <TableContainer>
      <Table aria-label="Expenses Table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { sx: '45%', md: '25%' } }}>
              <Typography component="span" variant="subtitle2">
                Category
              </Typography>
            </TableCell>
            {md && (
              <TableCell sx={{ width: '100%' }}>
                <Typography component="span" variant="subtitle2">
                  Description
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => {
            const categoryInfo = EXPENSE_ICON_BY_CATEGORY[expense.category];
            return (
              <TableRow
                key={expense.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Stack
                    component="span"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <ExpenseCategoryIcon
                      category={expense.category}
                      color={categoryInfo.color}
                      backgroundColor={categoryInfo.backgroundColor}
                      borderColor={'transparent'}
                      isSmall
                    >
                      {<categoryInfo.icon />}
                    </ExpenseCategoryIcon>
                    <Typography variant="subtitle1">
                      {expense.category}
                    </Typography>
                  </Stack>
                </TableCell>
                {md && (
                  <TableCell sx={{ width: 200, maxWidth: 200 }}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      sx={{ wordWrap: 'break-word' }}
                    >
                      {expense.description}
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Typography component="span" variant="subtitle1">
                    ${expense.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AppIconButton
                    onClick={() => onDelete(expense.id)}
                    aria-label="Remove Expense."
                  >
                    <DeleteIcon />
                  </AppIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box ref={bottomBoxRef} />
    </TableContainer>
  );
}
