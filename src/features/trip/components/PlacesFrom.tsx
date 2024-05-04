import React from 'react';
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, FormHelperText, InputBase, Stack } from '@mui/material';

import { Trip } from '@features/trip/types';

interface Props {
  defaultPlaces: Trip['places'];
  onSubmit: SubmitHandler<FormInput>;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  places: Trip['places'];
}

export default function PlacesForm(props: Props) {
  const { control, handleSubmit, places, errors, onInputKeyDown } =
    usePlacesForm(props);
  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(props.onSubmit)}
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
                    autoFocus={index === places.length - 1}
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

function usePlacesForm({ defaultPlaces }: Props) {
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

  return {
    control,
    handleSubmit,
    places,
    errors,
    onInputKeyDown,
  };
}
