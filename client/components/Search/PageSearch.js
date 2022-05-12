import React from 'react';
import { useSelector } from 'react-redux';
import ListSearch from './ListSearch';

const PageSearch = () => {
  const results = useSelector((state) => state.searchResults);
  return results && results.length === 0 ? (
    <h1>SORRY No Results :( </h1>
  ) : (
    <div>
      <ListSearch />
    </div>
  );
};

export default PageSearch;
