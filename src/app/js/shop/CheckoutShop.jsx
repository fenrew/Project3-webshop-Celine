import React from "react";

const CheckoutShop = props => {
  let imageStyle = {
    backgroundImage: props.image
  };
  return (
    <div className="each-checkout-element">
      <div className="checkout-icon" style={imageStyle} />
      <div className="checkout-text-container">
        <div className="checkout-name-header">{props.name}</div>
        <div className="checkout-price">{props.price},-</div>
        <div className="checkout-quantity"><button className="checkout-plus-button">+</button><span>5</span><button className="checkout-minus-button">-</button></div>
      </div>
    </div>
  );
};

export default CheckoutShop;
