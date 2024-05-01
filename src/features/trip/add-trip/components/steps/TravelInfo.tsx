import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { ButtonBase, Stack, TextField, Typography } from '@mui/material';

import { Colors } from '@config/style';
import PreviewImageDialog from '@features/trip/components/PreviewImageDialog';
import SelectedDateInput from '@features/ui/form/SelectDateInout';
import useDialog from '@hooks/useDialog';

import Pagination from '../navigation/Pagination';

interface FormInput {
  previewImage: string | null;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

export default function TravelInfo() {
  const { control, handleSubmit, onSubmit, formValues } = useTravelInfoForm();
  const { isOpen, open, close } = useDialog();

  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
        gap={3}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
          <ButtonBase
            onClick={open}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 152,
              minWidth: { xs: '100%', md: 152 },
              gap: 0.5,
              borderRadius: 4,
              border: 1,
              borderColor: 'text.secondary',
            }}
          >
            <ImageSearchIcon sx={{ color: Colors.disabled }} />
            <Typography color={Colors.disabled} variant="subtitle1">
              Preview Image
            </Typography>
          </ButtonBase>
          <Stack width="100%" gap={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Please specify your trip name.' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <TextField
                  variant="standard"
                  inputRef={ref}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Trip Name"
                  autoFocus
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  {...field}
                />
              )}
            />

            <Stack direction="row" gap={2}>
              <SelectedDateInput
                name="startDate"
                label="Start Date"
                control={control}
                requiredErrorText="Please specify starting date."
                maxDate={formValues.endDate}
              />

              <SelectedDateInput
                name="endDate"
                label="End Date"
                control={control}
                requiredErrorText="Please specify ending date."
                minDate={formValues.startDate}
              />
            </Stack>
          </Stack>
        </Stack>
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
        <Pagination />
        <PreviewImageDialog isOpen={isOpen} onClose={close} />
      </Stack>
    </>
  );
}

function useTravelInfoForm() {
  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      name: '',
      description: '',
      startDate: null,
      endDate: null,
    },
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // Todo: Save stepInfo
    console.log(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    formValues,
  };
}
