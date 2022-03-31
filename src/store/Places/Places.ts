import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceType } from "@utils";

import { PlacesReducer } from "./types";

const initialState: PlacesReducer = {
  selected: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlaces: (state, action: PayloadAction<Array<PlaceType>>) => ({
      ...state,
      selected: [...state.selected, ...action.payload],
    }),
    removePlace: (state, action: PayloadAction<PlaceType["id"]>) => ({
      ...state,
      selected: [
        ...state.selected.filter((place) => place.id !== action.payload),
      ],
    }),
  },
});

export const placesReducer = placesSlice.reducer;
export const placesActions = placesSlice.actions;
