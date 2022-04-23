import React from 'react';
import { connect } from 'react-redux';

const Cart = () => {
    return (
        <div>
            Add Cart Here
            <hr />
        </div>
    )
}

export default connect((state) => state)(Cart);

