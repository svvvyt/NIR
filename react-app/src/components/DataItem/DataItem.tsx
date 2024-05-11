import React from 'react';

import { DataItemProps } from '../../types';

import './DataItem.css';

export const DataItem: React.FC<DataItemProps> = ({
  id,
  name,
  username,
  email,
  phone,
  website,
  address,
}) => {
  return (
    <div className='data-item'>
      user id: {id} <br />
      name: {name} <br />
      username: {username} <br />
      email: {email} <br />
      phone: {phone} <br />
      website: {website} <br />
      street: {address.street} <br />
      city: {address.city} <br />
      zip-code: {address.zipcode} <br />
    </div>
  );
};
