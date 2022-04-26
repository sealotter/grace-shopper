import React from 'react';
import { connect } from 'react-redux';
import { getLineItems } from '../store/LineItems';

const LineItems = ({ lineItems }) => {
    return (
        <div>
            Items:
            <ul>
                {lineItems.map( lineItem => {
                    return (
                        <div> {lineItem.albumId} x {lineItem.quantity}</div>
                    )
                })}
            </ul>
        </div>
    )
}
export default connect((state) => state)(LineItems);