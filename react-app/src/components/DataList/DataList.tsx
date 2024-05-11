import React from 'react';

import { DataItem } from '../DataItem/DataItem';

import { DataListProps } from '../../types';

export const DataList: React.FC<DataListProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <DataItem key={item.id} {...item} />
      ))}
    </div>
  );
};
