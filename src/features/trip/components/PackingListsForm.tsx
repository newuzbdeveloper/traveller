import React, { useState } from 'react';
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Checkbox,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Colors } from '@config/style';
import { Trip } from '@features/trip/types';
import AppButton from '@features/ui/AppButton';

interface Props {
  defaultPackingLists: Trip['packingLists'];
  onSubmit: SubmitHandler<FormInput>;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  packingLists: Trip['packingLists'];
}

export default function PackingListsForm(props: Props) {
  const {
    control,
    handleSubmit,
    packingLists,
    onInputKeyDown,
    newListName,
    setNewListName,
    onAddPackingList,
    onRemovePackingList,
    onNewListInputKeyDown,
  } = usePackingListsForm(props);
  return (
    <>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(props.onSubmit)}
        sx={{ width: '100%' }}
        gap={3}
      >
        <Stack gap={1}>
          <TextField
            label="List Title"
            placeholder=" 💻 Electronics"
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
            inputProps={{
              autoFocus: true,
              onKeyDown: (event) => onNewListInputKeyDown(event),
            }}
            variant="standard"
          />
          <AppButton
            disabled={!newListName}
            variant="text"
            startIcon={<AddIcon />}
            onClick={onAddPackingList}
          >
            ADD CHECKLIST
          </AppButton>
        </Stack>
        <Grid columns={{ xs: 1, md: 3, xl: 4 }} container rowGap={2}>
          {packingLists.map((packingList, packingLitsIndex) => (
            <Grid
              xs={1}
              key={packingList.id}
              item
              sx={{
                borderRight: { xs: 'none', md: 1 },
                borderBottom: { xs: 1, md: 'none' },
                borderColor: { sx: 'grey.200', md: 'grey.200' },
                px: { md: 2 },
                pb: { xs: 2, md: 0 },
                minHeight: { xs: 194, md: 'auto' },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{ pl: 1, pb: { md: 0.5 } }}
              >
                <Typography variant="body2">{packingList.name}</Typography>
                <IconButton
                  sx={{ color: Colors.secondaryBlue, mr: { xs: 1, md: 0 } }}
                  onClick={() => onRemovePackingList(packingLitsIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Stack gap={1}>
                {packingList.items.map((item, itemIndex) => (
                  <Stack direction="row" key={item.id}>
                    <Controller
                      name={`packingLists.${packingLitsIndex}.items.${itemIndex}.isChecked`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                          inputProps={{
                            'aria-label': 'Is Packing list item checked?.',
                          }}
                        />
                      )}
                    />
                    <Controller
                      name={`packingLists.${packingLitsIndex}.items.${itemIndex}.text`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <InputBase
                          inputRef={ref}
                          placeholder="Type here..."
                          id={`${packingList.name}.${packingLitsIndex}.items.${itemIndex}`}
                          inputProps={{
                            'aria-label': 'Packing List Item Name',
                          }}
                          onKeyDown={(event) =>
                            onInputKeyDown(event, packingLitsIndex, itemIndex)
                          }
                          sx={{
                            textDecoration: item.isChecked
                              ? 'line-through'
                              : 'none',
                            width: '100%',
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        {props.SubmitComponent}
      </Stack>
    </>
  );
}

function usePackingListsForm({ defaultPackingLists }: Props) {
  const [newListName, setNewListName] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<FormInput>({
    defaultValues: {
      packingLists: defaultPackingLists,
    },
  });

  const { append, remove, update } = useFieldArray({
    control,
    name: 'packingLists',
  });

  const onAddPackingList = () => {
    if (!newListName) {
      return;
    }
    append({
      id: uuidv4(),
      name: newListName,
      items: [{ id: uuidv4(), text: '', isChecked: false }],
    });
    setNewListName('');
  };

  const onRemovePackingList = (packingListsIndex: number) => {
    remove(packingListsIndex);
  };

  const packingLists = watch('packingLists');

  const onNewListInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAddPackingList();
    }
  };
  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    packingListIndex: number,
    itemIndex: number,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newItems = [...packingLists[packingListIndex].items];
      newItems.splice(itemIndex + 1, 0, {
        id: uuidv4(),
        text: '',
        isChecked: false,
      });
      update(packingListIndex, {
        ...packingLists[packingListIndex],
        items: newItems,
      });
      setTimeout(
        () =>
          setFocus(
            `packingLists.${packingListIndex}.items.${itemIndex + 1}.text`,
          ),
        0,
      );
    } else if (event.key === 'Backspace') {
      if (
        !packingLists[packingListIndex].items[itemIndex].text &&
        packingLists[packingListIndex].items.length > 1
      ) {
        event.preventDefault();
        const newItems = [...packingLists[packingListIndex].items];
        newItems.splice(itemIndex, 1);
        update(packingListIndex, {
          ...packingLists[packingListIndex],
          items: newItems,
        });
        setTimeout(
          () =>
            setFocus(
              `packingLists.${packingListIndex}.items.${
                itemIndex === 0 ? 0 : itemIndex - 1
              }.text`,
            ),
          0,
        );
      }
    }
  };

  return {
    control,
    handleSubmit,
    packingLists,
    errors,
    onInputKeyDown,
    newListName,
    setNewListName,
    onAddPackingList,
    onRemovePackingList,
    onNewListInputKeyDown,
  };
}
