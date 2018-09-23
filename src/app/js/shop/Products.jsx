import React from "react";

const Products = props => {
  let imageStyle = {
    backgroundImage: props.image
  };
  let price = props.price * props.quantity
  return (
    <div>
      <hr/>
      <div className="checkout-cart-text-container">
        <div className="checkout-cart-name-header">
        {props.quantity}x  {props.product}
        </div>
        <div className="checkout-cart-price">
          {price}
          ,-
        </div>
      </div>
    </div>
  );
};

export default Products;
