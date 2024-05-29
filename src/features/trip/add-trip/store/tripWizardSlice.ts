import { PURGE } from 'redux-persist';
import { v4 as uuidv4 } from 'uuid';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Trip } from '@features/trip/types';
import { type RootState } from '@store/index';

interface TripWizardState {
  trip: Trip;
  currentStep: number;
}

const getInitialState = () => ({
  currentStep: 0,
  trip: {
    id: uuidv4(),
    name: '',
    previewImage: null,
    description: '',
    startDate: null,
    endDate: null,
    locationFrom: '',
    destinations: [{ id: uuidv4(), name: '' }],
    places: [{ id: uuidv4(), name: '', isChecked: false }],
    expenses: [],
    documents: [],
    packingLists: [],
    photos: [],
  },
});

const initialState: TripWizardState = getInitialState();

export const tripWizardSlice = createSlice({
  name: 'tripWizard',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep === 0) {
        throw new Error(
          'You are already on the first page, you can not go back!',
        );
      }
      state.currentStep -= 1;
    },
    setTravelInfo: (
      state,
      action: PayloadAction<
        Pick<
          Trip,
          'description' | 'endDate' | 'startDate' | 'name' | 'previewImage'
        >
      >,
    ) => {
      state.trip.name = action.payload.name;
      state.trip.description = action.payload.description;
      state.trip.startDate = action.payload.startDate;
      state.trip.endDate = action.payload.endDate;
      state.trip.previewImage = action.payload.previewImage;
    },
    setLocationFromInfo: (
      state,
      action: PayloadAction<Trip['locationFrom']>,
    ) => {
      state.trip.locationFrom = action.payload;
    },
    setDestinationsInfo: (
      state,
      action: PayloadAction<Trip['destinations']>,
    ) => {
      state.trip.destinations = action.payload;
    },
    setPlacesInfo: (state, action: PayloadAction<Trip['places']>) => {
      state.trip.places = action.payload;
    },
    setExpensesInfo: (state, action: PayloadAction<Trip['expenses']>) => {
      state.trip.expenses = action.payload;
    },
    setDocumentsInfo: (state, action: PayloadAction<Trip['documents']>) => {
      state.trip.documents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return getInitialState();
    });
  },
});

export const {
  nextStep,
  previousStep,
  setTravelInfo,
  setLocationFromInfo,
  setDestinationsInfo,
  setPlacesInfo,
  setExpensesInfo,
  setDocumentsInfo,
} = tripWizardSlice.actions;

export const selectCurrentStep = (state: RootState) =>
  state.tripWizard.currentStep;
export const selectWizardTrip = (state: RootState) => state.tripWizard.trip;

export default tripWizardSlice.reducer;
