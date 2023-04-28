import './styles.scss';

import React from 'react';

/* Components */
import { Box } from '@mui/material';

const Image = ({ src, alt }) => {
  return (
    <Box className='image'>
      <img src={src} alt={alt} />
    </Box>
  );
};

export default Image;
