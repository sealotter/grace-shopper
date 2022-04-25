import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';

const Cart = ({ carts, lineItems }) => {
    console.log(carts)
    return (
        <div>
            Shopping Cart:
            <ul>
                { carts.map( cart => {
                    return (
                        <div key={cart.id}> Your cart id is: {cart.id} </div>
                    )
                })}
            </ul>
            <LineItems />
            <hr />
        </div>
    )
}

export default connect((state) => state)(Cart);

