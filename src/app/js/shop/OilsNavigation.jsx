import React from 'react';

const OilsNavigation = props => {
    let outOfStock;
    if (!props.stocked) outOfStock = {
        color: "red"
    }
  return (
  <tr>
    <td style={outOfStock}>{props.name}</td>
    <button onClick={() => {props.addToCart(props.name)}}>Kjøp</button>
  </tr>
  )
};

export default OilsNavigation;