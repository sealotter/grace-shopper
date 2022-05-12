import React, { useEffect } from 'react';
import GenreList from './GenreList';
import SideBySideGenre from './SideBySideGenre';

const Genre = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SideBySideGenre />
      <GenreList />
    </div>
  );
};

export default Genre;
