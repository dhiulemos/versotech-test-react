import './styles.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTypesPagination,
  setTypesPokemons,
  resetTypesPagination,
} from '../../features/typesSlice';

import api from '../../services/api';

/* Components */
import { Box, Container, Grid } from '@mui/material';

import InfinityScroll from '../../components/InfinityScroll';
import NotFound from '../../components/NotFound';
import PokeCard from '../../components/PokeCard';
import Spinner from '../../components/Spinner';

const PokemonsType = () => {
  const { type } = useParams();

  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.types.typesPokemons);
  const pagination = useSelector((state) => state.types.typesPagination);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemons();
  }, [type]);

  const loadPokemons = async () => {
    try {
      const response = await api.get(`/type/${type}`);

      dispatch(setTypesPokemons(response.data.pokemon));
      dispatch(resetTypesPagination());
      setLoading(false);

      return;
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className='pokemons-types container upperspace underspace '>
      <h1 className='title underspace'>{type}</h1>

      {pokemons.length == 0 ? (
        <NotFound text='Pokemons not found :(' />
      ) : (
        <Grid container className='underspace' spacing={4}>
          {pokemons.map(({ pokemon }, i) => {
            return i + 1 <= pagination ? (
              <Grid item xs={12} sm={6} md={4} lg={3} p={0}>
                <PokeCard name={pokemon.name} />
              </Grid>
            ) : null;
          })}
        </Grid>
      )}

      {pagination <= pokemons.length + 1 ? (
        <InfinityScroll
          text='Mais Pokemons'
          eventAction={() => dispatch(setTypesPagination())}
        />
      ) : null}
    </Container>
  );
};

export default PokemonsType;
