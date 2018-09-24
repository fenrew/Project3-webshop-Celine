import React from "react";
import EachItem from "./EachItem";

const Purchase = props => {
  const mappedItems = props.items.map((el, index) => (
    <EachItem
      name={el.name}
      quantity={el.quantity}
      price={el.price}
      key={index}
    />
  ));

  let datoSpliced = props.date
  datoSpliced.split("").splice((datoSpliced.length - 5), 1).join("")
  console.log(datoSpliced)
  
  let betalt = "Nei";
  if (props.charged) betalt = "Ja";

  return (
    <div className="each-purchase-container">
      <div className="each-purchase-information">
        <h2>Informasjon:</h2>
        <div className="text-box-info">
          <div className="text-box-info-first-box">
            <b>Navn:</b> <br/>
            <b>E-post:</b> <br />
            <b>Telefonnummer:</b> <br />
            <b>Adresse:</b> <br />
            <b>Postnummer:</b> <br />
            <b>Poststed:</b> <br />
            <b>Total Pris:</b> <br />
            <b>Betalt:</b> <br />
            <b>Dato:</b> <br />
          </div>
          <div>
            {props.name} <br />
            {props.epost} <br />
            {props.telephone} <br />
            {props.address} <br />
            {props.postnumber} <br />
            {props.postplace} <br />
            {props.totalPrice} kroner <br />
            {betalt} <br />
          </div>
        </div>
      </div>
      <div className="each-purchase-products">
        <h2>Produkter:</h2>
        {mappedItems}
      </div>
    </div>
  );
};

export default Purchase;
