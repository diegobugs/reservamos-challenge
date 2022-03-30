import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "@utils";

import { PlacesReducer } from "./types";

const initialState: PlacesReducer = {
  selected: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlaces: (state, action: PayloadAction<Array<Place>>) => ({
      ...state,
      selected: [...state.selected, ...action.payload],
    }),
  },
});

export const placesReducer = placesSlice.reducer;
export const placesActions = placesSlice.actions;
