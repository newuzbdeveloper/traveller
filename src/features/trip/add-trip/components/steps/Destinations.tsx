import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, TextField } from '@mui/material';

import { MAX_NUMBER_DESTINATIONS } from '@features/trip/constants';
import { Trip } from '@features/trip/types';
import AppButton from '@features/ui/AppButton';
import AppIconButton from '@features/ui/AppIconButton';
import { useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setDestinationsInfo,
  setLocationFromInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

interface FormInput {
  locationFrom: Trip['locationFrom'];
  destinations: Trip['destinations'];
}

export default function Destinations() {
  const {
    control,
    handleSubmit,
    onSubmit,
    destinations,
    addDestination,
    removeDestination,
  } = useDestinationsForm();

  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
        gap={2}
      >
        <Stack gap={3}>
          <Controller
            name="locationFrom"
            control={control}
            rules={{ required: 'Please specify where your trip starts.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                autoFocus
                required
                variant="standard"
                inputRef={ref}
                margin="normal"
                fullWidth
                id="description"
                label="From"
                multiline
                maxRows={6}
                inputProps={{ maxLength: 200 }}
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
          {destinations.map((destination, index) => (
            <Stack
              direction="row"
              gap={1}
              key={destination.id}
              alignItems="flex-end"
            >
              <Controller
                name={`destinations.${index}.name`}
                control={control}
                rules={{ required: 'Please specify your destination.' }}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    required
                    variant="standard"
                    inputRef={ref}
                    margin="normal"
                    fullWidth
                    id={`${destination}.${index}`}
                    label={`Destination ${index + 1}`}
                    multiline
                    maxRows={6}
                    inputProps={{ maxLength: 200 }}
                    helperText={fieldState.error?.message}
                    error={Boolean(fieldState.error)}
                    {...field}
                  />
                )}
              />
              {index !== 0 && (
                <AppIconButton
                  onClick={() => removeDestination(index)}
                  aria-label="Remove Destination."
                >
                  <DeleteIcon />
                </AppIconButton>
              )}
            </Stack>
          ))}
        </Stack>
        {destinations.length < MAX_NUMBER_DESTINATIONS && (
          <AppButton
            variant="text"
            onClick={addDestination}
            startIcon={<AddIcon />}
          >
            ADD DESTINATION
          </AppButton>
        )}
        <Pagination />
      </Stack>
    </>
  );
}

function useDestinationsForm() {
  const dispatch = useDispatch();
  const trip = useAppSelector(selectWizardTrip);
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      locationFrom: trip.locationFrom,
      destinations: trip.destinations,
    },
  });

  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'destinations',
  });

  const addDestination = () => {
    append({ id: uuidv4(), name: '' });
  };

  const removeDestination = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setLocationFromInfo(data.locationFrom));
    dispatch(setDestinationsInfo(data.destinations));
    dispatch(nextStep());
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    destinations,
    addDestination,
    removeDestination,
  };
}
