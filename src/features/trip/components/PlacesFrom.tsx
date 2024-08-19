import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import {
  Controller,
  type SubmitHandler,
  type UseFormWatch,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, FormHelperText, InputBase, Stack } from '@mui/material';

import { Trip } from '@features/trip/types';

interface Props {
  defaultPlaces: Trip['places'];
  onSubmit?: (places: Trip['places']) => void;
  onChange?: (newPlaces: Trip['places']) => void;
  SubmitComponent?: React.ReactNode;
  autoFocus?: boolean;
}

interface FormInput {
  places: Trip['places'];
}

export default function PlacesForm(props: Props) {
  const {
    control,
    handleSubmit,
    places,
    errors,
    onInputKeyDown,
    onFormSubmit,
  } = usePlacesForm(props);
  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ width: '100%' }}
        gap={1}
      >
        {places.map((place, index) => (
          <Stack key={place.id}>
            <Stack direction="row" gap={0.25} key={place.id}>
              <Controller
                name={`places.${index}.isChecked`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    inputProps={{ 'aria-label': 'Is Place visited checkbox.' }}
                  />
                )}
              />
              <Controller
                name={`places.${index}.name`}
                control={control}
                rules={{ required: 'Please specify place you want to visit.' }}
                render={({ field: { ref, ...field } }) => (
                  <InputBase
                    inputRef={ref}
                    placeholder="Type here..."
                    id={`${place}.${index}`}
                    inputProps={{ 'aria-label': 'Place Name' }}
                    onKeyDown={(event) => onInputKeyDown(event, index)}
                    autoFocus={props.autoFocus && index === places.length - 1}
                    sx={{
                      textDecoration: place.isChecked ? 'line-through' : 'none',
                      width: '100%',
                    }}
                    {...field}
                  />
                )}
              />
            </Stack>
            {errors.places?.[index] && (
              <FormHelperText error sx={{ marginLeft: 1.5 }}>
                {errors.places[index]?.name?.message}
              </FormHelperText>
            )}
          </Stack>
        ))}
        {props.SubmitComponent}
      </Stack>
    </>
  );
}

function usePlacesForm({ defaultPlaces, onSubmit, onChange }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<FormInput>({
    defaultValues: {
      places: defaultPlaces,
    },
  });

  const { insert, remove } = useFieldArray({
    control,
    name: 'places',
  });

  const places = watch('places');

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(),
        insert(
          index + 1,
          { id: uuidv4(), name: '', isChecked: false },
          { shouldFocus: true },
        );
    } else if (event.key === 'Backspace') {
      if (places[index].name.length === 0 && places.length > 1) {
        event.preventDefault();
        remove(index);
        setFocus(`places.${index - 1}.name`);
      }
    }
  };

  const onFormSubmit: SubmitHandler<FormInput> = (data) => {
    onSubmit?.(data.places);
  };

  useWatchChange(watch, onChange);
  return {
    control,
    handleSubmit,
    places,
    errors,
    onInputKeyDown,
    onFormSubmit,
  };
}

function useWatchChange(
  watch: UseFormWatch<FormInput>,
  onChange?: (data: Trip['places']) => void,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce((data: Trip['places']) => {
      onChange?.(data);
    }, 500),
    [],
  );

  useEffect(() => {
    const formUpdateSubscription = watch((newValues) => {
      onUpdateDebounced(newValues.places as Trip['places']);
    });

    return () => formUpdateSubscription.unsubscribe();
  }, [onUpdateDebounced, watch]);
}
