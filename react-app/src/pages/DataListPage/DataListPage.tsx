import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { DataList, LoadingBlock } from '../../components';

import { DataItemProps } from '../../types';

export const DataListPage = () => {
  const [dataList, setDataList] = useState<DataItemProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { limit } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
      .then((response) => {
        setDataList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [limit]);

  return (
    <div>
      {isLoading ? (
        <LoadingBlock text='user-list' />
      ) : (
        <DataList data={dataList} />
      )}
    </div>
  );
};
