import './styles.scss';

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearchAlt } from 'react-icons/bi';

import { setFilterTypes } from '../../features/typesSlice';
import { setFilterPokemons } from '../../features/pokemonsSlice';

import api from '../../services/api';

/* Components */
import { Box, Container, List, ListItem } from '@mui/material';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterTypes = useSelector((state) => state.types.filterTypes);
  const filterPokemons = useSelector((state) => state.pokemons.filterPokemons);

  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    loadFilterTypes();
    loadFilterPokemons();
  }, []);

  const loadFilterTypes = async () => {
    try {
      const response = await api.get('/type');
      dispatch(setFilterTypes(response.data.results));

      return;
    } catch (err) {
      console.log(err);
    }
  };

  const loadFilterPokemons = async () => {
    try {
      const response = await api.get('/pokemon?limit=20000');
      dispatch(setFilterPokemons(response.data.results));

      return;
    } catch (err) {
      console.log(err);
    }
  };

  const resetValues = () => {
    setFilter([]);
    setSearchValue('');
    setShowList(false);
  };

  const handleSearch = ({ name, url }) => {
    setFilter([]);
    setSearchValue('');
    setShowList(false);

    if (url.includes('pokemon')) {
      navigate(`/pokemon/${name}`, { replace: true });
      return;
    }

    navigate(`/pokemon/type/${name}`, { replace: true });
  };

  const handleSearchInput = (e) => {
    if (!e.target.value) {
      resetValues();
      return;
    }

    setSearchValue(e.target.value);

    const filteredTypes = filterTypes.filter((type) => {
      return type.name.startsWith(e.target.value);
    });

    const filteredPokemons = filterPokemons.filter((type) => {
      return type.name.startsWith(e.target.value);
    });

    setFilter([...filteredTypes, ...filteredPokemons]);
    setShowList(true);
  };

  return (
    <Container className='search'>
      <Box className='field'>
        <input
          className='input'
          type='text'
          placeholder='Name or type...'
          value={searchValue}
          onChange={(e) => handleSearchInput(e)}
        />
        <span>
          <BiSearchAlt fontSize='2.8rem' />
        </span>
      </Box>

      <List className={`list ${showList ? '-open' : ''}`}>
        {filter.map((fil) => {
          return (
            <ListItem className='list-item'>
              <button onClick={() => handleSearch(fil)}>
                {fil.name.replaceAll('-', ' ')}

                {fil.url.includes('pokemon') ? (
                  <span className='pokemon'>POKEMON</span>
                ) : (
                  <span className='type'>TYPE</span>
                )}
              </button>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Search;
