import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DataItemPage, DataListPage, NotFoundPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/data-list/limit/5' replace={true} />,
  },
  {
    path: '/data-item/:id',
    element: <DataItemPage />,
  },
  {
    path: '/data-list/limit/:limit/',
    element: <DataListPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
