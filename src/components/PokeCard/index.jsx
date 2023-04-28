import './styles.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

/* Components */
import { Box, Container, Grid } from '@mui/material';

import Image from '../Image';
import Skeleton from '../Skeleton';

const PokeCard = ({ name }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, [name]);

  const loadPokemon = async () => {
    try {
      const response = await api.get(`/pokemon/${name}`);

      setPokemon(response.data);
      setLoading(false);

      return;
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <article key={`skeleton-${name}`} className='pokecard'>
        <Skeleton />
      </article>
    );
  }

  return (
    <Container container className={`pokecard --${pokemon.types[0].type.name}`}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <Grid container>
          <Grid item className='description' xs={12} md={6}>
            <h2 className='name'>{pokemon.name.replaceAll('-', ' ')}</h2>

            <Box className='types'>
              {pokemon.types.map((typeItem) => {
                const { type } = typeItem;

                return (
                  <span className={`type --${type.name}`}>{type.name}</span>
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={`Image ${pokemon.name.replaceAll('-', ' ')}`}
            />
          </Grid>
        </Grid>
      </Link>
    </Container>
  );
};

export default PokeCard;
