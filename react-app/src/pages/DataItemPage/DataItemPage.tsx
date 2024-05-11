import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { DataItem, LoadingBlock } from '../../components';

import { DataItemProps } from '../../types';

export const DataItemPage = () => {
  const [dataItem, setDataItem] = useState<DataItemProps>();
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setDataItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <LoadingBlock text='user-item' />
      ) : (
        <DataItem {...dataItem!} />
      )}
    </div>
  );
};
