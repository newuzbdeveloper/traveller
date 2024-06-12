import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';

import ExpenseDialog from '@features/trip/components/Expenses/ExpenseDialog';
import ExpensesTable from '@features/trip/components/Expenses/ExpensesTable';
import type { Expense, Trip } from '@features/trip/types';
import AppButton from '@features/ui/AppButton';
import useDialog from '@hooks/useDialog';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setExpensesInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

interface FormInput {
  expenses: Trip['expenses'];
}

export default function Expenses() {
  const { open, isOpen, close } = useDialog();
  const { onSubmit, expenses, handleSubmit, addExpense, removeExpense } =
    useExpensesForm({
      closeExpenseDialog: close,
    });

  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
        gap={3}
      >
        <AppButton
          fullWidth
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={open}
        >
          ADD EXPENSE
        </AppButton>
        <ExpenseDialog isOpen={isOpen} onClose={close} onSave={addExpense} />
        {expenses.length > 0 && (
          <ExpensesTable expenses={expenses} onDelete={removeExpense} />
        )}
        <Pagination />
      </Stack>
    </>
  );
}

function useExpensesForm({
  closeExpenseDialog,
}: {
  closeExpenseDialog: () => void;
}) {
  const trip = useAppSelector(selectWizardTrip);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      expenses: trip.expenses,
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const addExpense = (expense: Expense) => {
    append(expense);
    closeExpenseDialog();
  };

  const removeExpense = (expenseId: string) => {
    remove(expenses.findIndex((expense) => expense.id === expenseId));
  };

  const expenses = watch('expenses');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setExpensesInfo(data.expenses));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    expenses,
    handleSubmit,
    addExpense,
    removeExpense,
  };
}
