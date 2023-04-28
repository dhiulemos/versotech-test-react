import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
  filterPokemons: [],
  pagination: '',
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setFilterPokemons: (state, action) => {
      state.filterPokemons = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setPokemons, setFilterPokemons, setPagination } =
  pokemonsSlice.actions;
export const pokemonsReducer = pokemonsSlice.reducer;
