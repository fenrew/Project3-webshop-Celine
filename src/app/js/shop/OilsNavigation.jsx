import React from 'react';

const OilsNavigation = props => {
    // let outOfStock;
    // if (!props.stocked) outOfStock = {
    //     color: "red"
    // }
  return (
  <div className="navigation-each-element">
    <div>{props.name} <button onClick={() => {props.addToCart(props.object)}}>Kjøp</button></div>
  </div>
  )
};

export default OilsNavigation;