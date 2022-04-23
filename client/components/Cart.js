import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';

const Cart = () => {
    return (
        <div>
            Shopping Cart:
            <LineItems />
            <hr />
        </div>
    )
}

export default connect((state) => state)(Cart);

