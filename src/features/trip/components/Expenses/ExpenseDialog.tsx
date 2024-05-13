import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { removeTrailingZeros } from '@features/trip/utils/removeTrailingZero';
import AppDialog from '@features/ui/AppDialog';
import { useBreakpoints } from '@hooks/useBreakpoints';

import { EXPENSES_CATEGORIES, EXPENSE_ICON_BY_CATEGORY } from '../../data';
import type { Expense } from '../../types';
import ExpenseCategoryIcon from './ExpenseCategoryIcon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addExpense: Expense) => void;
}

interface FormInput {
  category: Expense['category'];
  amount: Expense['amount'];
  description: Expense['description'];
}

export default function ExpenseDialog(props: Props) {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    register,
    selectedCategory,
    onReset,
    onCategoryClick,
  } = useExpensesInfoForm(props);

  const { md } = useBreakpoints();
  return (
    <AppDialog
      title="Add expense"
      primaryButtonText="Save"
      isOpen={props.isOpen}
      onClose={onReset}
      isForm
      onPrimaryButtonClick={handleSubmit(onSubmit)}
      maxWidth={864}
    >
      <Stack sx={{ width: '100%' }} gap={4}>
        <Grid
          container={!md}
          display={{ xs: 'grid', md: 'flex' }}
          gridTemplateColumns="repeat(3, 75px)"
          columnGap={{ xs: 5, sm: 20, md: 0 }}
          justifyContent="space-between"
          rowGap={2}
        >
          {EXPENSES_CATEGORIES.map(({ category, id }) => {
            const categoryInfo = EXPENSE_ICON_BY_CATEGORY[category];
            return (
              <Grid
                item
                gap={1}
                alignItems="center"
                display="flex"
                flexDirection="column"
                key={id}
              >
                <ExpenseCategoryIcon
                  category={category}
                  onClick={() => onCategoryClick(category)}
                  color={categoryInfo.color}
                  backgroundColor={categoryInfo.backgroundColor}
                  borderColor={
                    category === selectedCategory ? categoryInfo.color : 'white'
                  }
                >
                  {<categoryInfo.icon fontSize="large" />}
                </ExpenseCategoryIcon>
                <Typography variant="subtitle1">{category}</Typography>
              </Grid>
            );
          })}
          <input
            type="hidden"
            {...register('category', {
              required: 'Please select a category!',
            })}
          />
        </Grid>
        {errors.category && (
          <FormHelperText error>{errors.category.message}</FormHelperText>
        )}
        <Stack gap={3}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Please specify the amount.',
              validate: {
                positiveNumber: (value) =>
                  value > 0 ? undefined : 'Amount should be greater than zero',
              },
            }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                type="number"
                variant="standard"
                required
                inputRef={ref}
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
                onChange={(event) =>
                  field.onChange(removeTrailingZeros(event.target.value))
                }
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                variant="standard"
                inputRef={ref}
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                multiline
                maxRows={6}
                inputProps={{ maxLength: 200 }}
                helperText={
                  fieldState.error?.message ?? `${field.value.length} / 200`
                }
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
        </Stack>
      </Stack>
    </AppDialog>
  );
}

function useExpensesInfoForm({ onSave, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
    resetField,
    reset,
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      category: undefined,
      amount: 0,
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSave({ id: uuidv4(), ...data });
    onReset();
  };

  const onReset = () => {
    onClose();
    resetField('category');
    reset();
  };

  const onCategoryClick = (category: Expense['category']) => {
    setValue('category', category);
    trigger('category');
  };

  const selectedCategory = watch('category');

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    register,
    selectedCategory,
    onReset,
    onCategoryClick,
  };
}
