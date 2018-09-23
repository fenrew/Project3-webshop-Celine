import React from "react";

const OilsMain = props => {
    let outOfStock;
    // if (!props.stocked) outOfStock = {
    //     color: "red"
    // }
    let imageStyle = {
      backgroundImage: props.image
    }
  return (
  <div className="product-card">
    <div className="product-icons" style={imageStyle}></div>
    <div className="product-header-text" style={outOfStock}>{props.name}</div>
    <div>{props.info}</div>
    <br/>
    <div><b>{props.price},-</b> <button className="shopping-button" onClick={() => {props.addToCart(props.object)}}>Kjøp</button></div>
  </div>
  )
};

export default OilsMain;
