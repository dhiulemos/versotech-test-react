import './styles.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setPokemon } from '../../features/pokemonSlice';

import api from '../../services/api';

/* Components */
import { Box, Grid, List, ListItem } from '@mui/material';

import Spinner from '../../components/Spinner';
import Image from '../../components/Image';

const PokemonsInfos = () => {
  const dispatch = useDispatch();

  const { name } = useParams();

  const [loading, setLoading] = useState(true);
  const pokemon = useSelector((state) => state.pokemon.pokemon);

  useEffect(() => {
    loadPokemon();
  }, [name]);

  const loadPokemon = async () => {
    try {
      const response = await api.get(`/pokemon/${name}`);
      dispatch(setPokemon(response.data));
      setLoading(false);

      return;
    } catch (err) {
      dispatch(setPokemon({}));
      setLoading(false);

      console.log(err);
    }
  };

  const PokemonInfos = () => {
    return (
      <>
        <Box className='infos'>
          <span className='id'>#{pokemon.id.toString().padStart(3, 0)}</span>
          <h1 className='name'>{pokemon.name.replaceAll('-', ' ')}</h1>
        </Box>

        <Box className='types'>
          {pokemon.types.map((typeItem) => {
            const { type } = typeItem;
            return <span className={`type --${type.name}`}>{type.name}</span>;
          })}
        </Box>

        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={`Image ${pokemon.name.replaceAll('-', ' ')}`}
        />
      </>
    );
  };

  const AboutList = () => {
    return (
      <List>
        <ListItem className='list-item'>
          <h3>Height</h3>
          <p>{pokemon.height / 10} cm</p>
        </ListItem>

        <ListItem className='list-item'>
          <h3 className='about-title'>Weight</h3>
          <p>{pokemon.weight / 10} kg</p>
        </ListItem>

        <ListItem className='list-item'>
          <h3 className='about-title'>Abilities</h3>
          <p>
            {pokemon.abilities.map((ability, i) => {
              return (
                <>
                  {ability.ability.name.replaceAll('-', ' ')}
                  {i != pokemon.abilities.length - 1 ? ', ' : null}
                </>
              );
            })}
          </p>
        </ListItem>
      </List>
    );
  };

  const StatsList = () => {
    return (
      <List>
        {pokemon.stats.map((stat) => {
          return (
            <ListItem className='list-item'>
              <h3 className='stats-title'>
                {stat.stat.name.replaceAll('-', ' ')}
              </h3>
              <p>{stat.base_stat}</p>
            </ListItem>
          );
        })}
      </List>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Grid container className='pokemon-infos container upperspace underspace'>
      <Grid
        item
        xs={12}
        md={4}
        className={`left --${pokemon.types[0].type.name}`}
      >
        <PokemonInfos />
      </Grid>

      <Grid item xs={12} md={6} className='right'>
        <Box sx={{ paddingBottom: '3rem' }}>
          <h2 className='subtitle'>About</h2>

          <AboutList />
        </Box>

        <Box>
          <h2 className='subtitle'>Base Stats</h2>

          <StatsList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PokemonsInfos;
