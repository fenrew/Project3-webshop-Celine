import React from "react";

const CheckoutInput = props => {
  return (
    <div className="checkout-information-inputs">
      <label htmlFor="navn">Navn: </label>
      <input
        type="text"
        name="navn"
        placeholder="Skriv inn navnet ditt"
        onChange={evt => props.handleInputChange("name", evt.target.value)}
        value={props.name}
        maxlength="30"
      />
      <br />
      <label htmlFor="telefonnummer">Telefonnummer: </label>
      <input
        type="text"
        name="telefonnummer"
        placeholder="Skriv inn telefonnummeret ditt"
        onChange={evt => props.handleInputChange("telephone", evt.target.value)}
        value={props.telephone}
        maxlength="20"
      />
      <br />
      <label htmlFor="adresse">Adresse: </label>
      <input
        type="text"
        name="adresse"
        placeholder="Skriv inn adressen din"
        onChange={evt => props.handleInputChange("address", evt.target.value)}
        value={props.address}
        maxlength="30"
      />
      <br />
      <label htmlFor="postnummer">Postnummer: </label>
      <input
        type="number"
        name="postnummer"
        placeholder="Skriv inn postnummeret ditt"
        onChange={evt =>
          props.handleInputChange("postnumber", evt.target.value)
        }
        value={props.postnumber}
        maxlength="10"
      />
      <br />
      <label htmlFor="poststed">Poststed: </label>
      <input
        type="text"
        name="poststed"
        placeholder="Skriv inn poststedet ditt"
        onChange={evt => props.handleInputChange("postplace", evt.target.value)}
        value={props.postplace}
        maxlength="15"
      />
      <br />
    </div>
  );
};

export default CheckoutInput;
