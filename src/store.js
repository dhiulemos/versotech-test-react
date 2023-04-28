import { configureStore } from '@reduxjs/toolkit';
import { pokemonsReducer } from './features/pokemonsSlice';
import { pokemonReducer } from './features/pokemonSlice';
import { typesReducer } from './features/typesSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    types: typesReducer,
  },
});
