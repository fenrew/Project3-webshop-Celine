import React from "react";

const OilsMain = props => {
    let outOfStock;
    if (!props.stocked) outOfStock = {
        color: "red"
    }
    let imageStyle = {
      backgroundImage: props.image
    }
  return (
  <div className="product-card">
    <div className="product-icons" style={imageStyle}></div>
    <div className="product-header-text" style={outOfStock}>{props.name}</div>
    <div>{props.info}</div>
    <br/>
    <div>{props.price} </div>
    <button className="shopping-button" onClick={() => {props.addToCart(props.name)}}>Kjøp</button>
  </div>
  )
};

export default OilsMain;
