import './styles.scss';

import React from 'react';

const Spinner = () => {
  return (
    <div className='spinner-area'>
      <div class='spinner-square'>
        <div class='square-1 square'></div>
        <div class='square-2 square'></div>
        <div class='square-3 square'></div>
      </div>
    </div>
  );
};

export default Spinner;
