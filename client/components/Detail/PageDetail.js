import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import ListDetail from './ListDetail';

const PageDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ListDetail />
    </div>
  );
};

export default PageDetail;
