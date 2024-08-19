import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { Controller, type UseFormWatch, useForm } from 'react-hook-form';

import PaidIcon from '@mui/icons-material/Paid';
import { InputLabel, Stack, TextField, Typography } from '@mui/material';

import { Colors } from '@config/style/Colors';
import PlacesForm from '@features/trip/components/PlacesFrom';
import type { Trip } from '@features/trip/types';
import SelectedDateInput from '@features/ui/form/SelectDateInput';

import ContentCard from './ContentCard';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

interface FormInput {
  name: Trip['name'];
  description: Trip['description'];
  startDate: Trip['startDate'];
  endDate: Trip['endDate'];
}

export default function TravelInfoAndPlaces(props: Props) {
  const { control, formValues } = useTravelInfoForm(props);
  const totalBudget = 360;
  const onPlacesUpdate = (newPlaces: Trip['places']) =>
    props.onUpdate({ places: newPlaces });

  return (
    <Stack gap={3}>
      <ContentCard title="Trip Details">
        <Stack component="form" noValidate sx={{ width: '100%' }} gap={3}>
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
                  fullWidth
                  id="name"
                  label="Trip Name"
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
                sx={{ svg: { color: Colors.secondaryBlue }, maxWidth: 150 }}
              />

              <SelectedDateInput
                name="endDate"
                label="End Date"
                control={control}
                requiredErrorText="Please specify ending date."
                minDate={formValues.startDate}
                sx={{ svg: { color: Colors.secondaryBlue }, maxWidth: 150 }}
              />

              <Stack gap={0.5}>
                <InputLabel
                  sx={{ fontSize: '0.875rem', lineHeight: '1.313rem' }}
                >
                  Budget
                </InputLabel>
                <Stack direction="row" gap={1}>
                  <PaidIcon sx={{ color: Colors.secondaryBlue }} />
                  <Typography variant="subtitle1">{totalBudget}$</Typography>
                </Stack>
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
        </Stack>
      </ContentCard>
      <ContentCard title="Places">
        <PlacesForm
          defaultPlaces={props.trip.places}
          onChange={onPlacesUpdate}
          SubmitComponent={undefined}
        />
      </ContentCard>
    </Stack>
  );
}

function useTravelInfoForm({ trip, onUpdate }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
  });

  const formValues = watch();
  useWatchChange(watch, onUpdate);

  return {
    control,
    formValues,
    handleSubmit,
    register,
    setValue,
    errors,
    trigger,
  };
}

function useWatchChange(
  watch: UseFormWatch<FormInput>,
  onUpdate: (data: Partial<Trip>) => void,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce((data: Partial<Trip>) => {
      onUpdate(data);
    }, 500),
    [],
  );

  useEffect(() => {
    const formUpdateSubscription = watch((newValues) => {
      if (newValues.name && newValues.startDate && newValues.endDate) {
        onUpdateDebounced(newValues);
      }
    });

    return () => formUpdateSubscription.unsubscribe();
  }, [onUpdateDebounced, watch]);
}
