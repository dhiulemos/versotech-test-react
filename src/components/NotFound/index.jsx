import './styles.scss';

import React from 'react';

/* Components */
import { Container } from '@mui/material';

const NotFound = ({ text }) => {
  return (
    <Container className='not-found'>
      <h2>{text}</h2>
    </Container>
  );
};

export default NotFound;
