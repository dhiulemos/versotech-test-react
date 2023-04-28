import './styles.scss';

import React from 'react';

/* Components */
import { Box } from '@mui/material';

const InfinityScroll = ({ eventAction, text }) => {
  return (
    <Box className='infinity-scroll'>
      <button className='btn-load' onClick={eventAction}>
        {text}
      </button>
    </Box>
  );
};

export default InfinityScroll;
