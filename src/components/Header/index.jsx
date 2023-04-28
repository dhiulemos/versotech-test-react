import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg';

import Image from '../Image';
import Search from '../Search';
import { Container } from '@mui/material';

const Header = () => {
  return (
    <header id='header'>
      <Container className='container'>
        <Link to='/'>
          <Image src={logo} alt='Logo Pokedex' />
        </Link>

        <Search />
      </Container>
    </header>
  );
};

export default Header;
