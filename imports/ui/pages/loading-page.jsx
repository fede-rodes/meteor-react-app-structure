import React from 'react';
import { Blank } from '../layouts/blank.jsx';
import { Spinner } from '../components/spinner.jsx';

export const LoadingPage = () => (
  <Blank>
    <Spinner />
  </Blank>
);
