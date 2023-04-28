import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Components */
import Header from './components/Header';

/* Pages */
import Pokemons from './pages/Pokemons';
import PokemonsInfos from './pages/PokemonsInfos';
import PokemonsType from './pages/PokemonsType';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Pokemons />} />
        <Route path='/pokemon/:name' element={<PokemonsInfos />} />
        <Route path='/pokemon/type/:type' element={<PokemonsType />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
