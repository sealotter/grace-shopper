import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <h1> Payment Received!</h1>
      <Link to='/'> Back to Grace Vinyls </Link>
    </div>
  );
};

export default Success;
