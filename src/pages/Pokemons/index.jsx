import './styles.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemons, setPagination } from '../../features/pokemonsSlice';

import api from '../../services/api';

/* Components */
import { Box, Container, Grid } from '@mui/material';

import PokeCard from '../../components/PokeCard';
import Spinner from '../../components/Spinner';
import InfinityScroll from '../../components/InfinityScroll';

const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const pagination = useSelector((state) => state.pokemons.pagination);

  const [loading, setLoading] = useState(true);

  const loadPokemons = async () => {
    try {
      const response = await api.get('/pokemon?limit=24');

      dispatch(setPokemons(response.data.results));
      dispatch(setPagination(response.data.next));

      setLoading(false);

      return;
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      const response = await api.get(pagination);

      dispatch(setPokemons([...pokemons, ...response.data.results]));
      dispatch(setPagination(response.data.next));

      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className='container upperspace underspace'>
      <h1 className='title underspace'>Pokedex</h1>
      <Grid container spacing={4} className='underspace'>
        {pokemons.map((pokemon) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} p={0}>
              <PokeCard name={pokemon.name} />
            </Grid>
          );
        })}
      </Grid>

      {pagination ? (
        <InfinityScroll text='Mais Pokemons' eventAction={loadMore} />
      ) : null}
    </Container>
  );
};

export default Pokemons;
