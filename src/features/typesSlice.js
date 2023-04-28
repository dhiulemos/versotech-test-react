import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  types: [],
  filterTypes: [],
  typesPokemons: [],
  typesPagination: 12,
};

export const typesSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setFilterTypes: (state, action) => {
      state.filterTypes = action.payload;
    },
    setTypesPokemons: (state, action) => {
      state.typesPokemons = action.payload;
    },
    setTypesPagination: (state, action) => {
      state.typesPagination += 12;
    },
    resetTypesPagination: (state, action) => {
      state.typesPagination = 12;
    },
  },
});

export const {
  setTypes,
  setFilterTypes,
  setTypesPokemons,
  setTypesPagination,
  resetTypesPagination,
} = typesSlice.actions;
export const typesReducer = typesSlice.reducer;
