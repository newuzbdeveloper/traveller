import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import {
  Box,
  ButtonBase,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Colors } from '@config/style';
import PreviewImageDialog from '@features/trip/components/PreviewImageDialog';
import { usePreviewImageSrc } from '@features/trip/hooks/usePrevewImageHook';
import { Trip } from '@features/trip/types';
import SelectedDateInput from '@features/ui/form/SelectDateInput';
import useDialog from '@hooks/useDialog';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setPreviewImage,
  setTravelInfo,
} from '../../store/tripWizardSlice';
import Pagination from '../navigation/Pagination';

interface FormInput {
  previewImage: Trip['previewImage'];
  name: Trip['name'];
  description: Trip['description'];
  startDate: Trip['startDate'];
  endDate: Trip['endDate'];
}

export default function TravelInfo() {
  const {
    control,
    handleSubmit,
    onSubmit,
    formValues,
    register,
    setValue,
    errors,
    previewImageSrc,
    trigger,
  } = useTravelInfoForm();
  const { isOpen, open, close } = useDialog();

  const dispatch = useAppDispatch();
  const previewImageSave = (previewImage: Trip['previewImage']) => {
    close();
    dispatch(setPreviewImage(previewImage));
    setValue('previewImage', previewImage);
    trigger('previewImage');
  };

  const onPreviewImageChange = (previewImage: Trip['previewImage']) => {
    dispatch(setPreviewImage(previewImage));
    setValue('previewImage', previewImage);
  };

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
          <Stack>
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
              {previewImageSrc ? (
                <Box
                  component="img"
                  src={previewImageSrc}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <>
                  <ImageSearchIcon sx={{ color: Colors.disabled }} />
                  <Typography color={Colors.disabled} variant="subtitle1">
                    Preview Image
                  </Typography>
                </>
              )}
            </ButtonBase>
            {errors.previewImage && (
              <FormHelperText error sx={{ maxWidth: 152 }}>
                {errors.previewImage.message}
              </FormHelperText>
            )}
            <input
              type="hidden"
              {...register('previewImage', {
                required: 'Please select a preview image!',
              })}
            />
          </Stack>
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
                fullWidth
                requiredErrorText="Please specify starting date."
                maxDate={formValues.endDate}
              />

              <SelectedDateInput
                name="endDate"
                label="End Date"
                control={control}
                fullWidth
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
        <PreviewImageDialog
          key={previewImageSrc}
          isOpen={isOpen}
          onClose={close}
          onSave={previewImageSave}
          defaultPreviewImage={formValues.previewImage}
          defaultPreviewImageSrc={previewImageSrc}
          onChange={onPreviewImageChange}
        />
      </Stack>
    </>
  );
}

function useTravelInfoForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      previewImage: trip.previewImage,
    },
  });

  const formValues = watch();
  const previewImageSrc = usePreviewImageSrc(formValues.previewImage);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    dispatch(setTravelInfo(data));
    dispatch(nextStep());
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    formValues,
    register,
    setValue,
    errors,
    previewImageSrc,
    trigger,
  };
}
