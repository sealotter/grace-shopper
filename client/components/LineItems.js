import React from 'react';
import { connect } from 'react-redux';
import { getLineItems } from '../store/lineItems';

const LineItems = ({ lineItems }) => {
    return (
        <div>
            Items:
            <ul>
                {lineItems.map( lineItem => {
                    return (
                        <li key={lineItem.id}> {lineItem.albumId} x {lineItem.quantity} </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default connect((state) => state)(LineItems);