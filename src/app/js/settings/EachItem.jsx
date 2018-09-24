import React from 'react';

const EachItem = props => {
    let totalPrice = props.price * props.quantity;
    return (
        <div className="each-item">
        <table>
            <tbody>
                <tr>
                    <td><b>Navn:</b></td>
                    <td>{props.name}</td>
                </tr>
                <tr>
                    <td><b>Antall:</b></td>
                    <td>{props.quantity}</td>
                </tr>
                <tr>
                    <td><b>Pris:</b></td>
                    <td>{totalPrice}</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
};

export default EachItem;