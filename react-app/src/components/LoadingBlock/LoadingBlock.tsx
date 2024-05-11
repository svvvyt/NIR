import React from 'react';

import { LoadingBlockProps } from '../../types';

import './LoadingBlock.css';

export const LoadingBlock: React.FC<LoadingBlockProps> = ({ text }) => {
  return (
    <div className='ring'>
      {text}
      <span></span>
    </div>
  );
};
