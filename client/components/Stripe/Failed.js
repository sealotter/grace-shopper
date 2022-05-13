import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Failed = () => {
  return (
    <div>
      <h1> Payment Unsuccessful... </h1>
      <Link to='/'> Back to Grace Vinyls </Link>
    </div>
  );
};

export default Failed;
