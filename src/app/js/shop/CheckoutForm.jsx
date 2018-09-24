import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import api from "../utils/api";
import CheckoutInput from "./CheckoutInput";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      name: "",
      telephone: "",
      address: "",
      postnumber: "",
      postplace: ""
    };
    this.submit = this.submit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  async submit(ev) {
    const userString = localStorage.getItem("shopping-cart");
    const user = JSON.parse(userString);
    const shoppingCart = user.shoppingCart;
    const userInformation = {
      name: this.state.name,
      telephone: this.state.telephone,
      address: this.state.address,
      postnumber: this.state.postnumber,
      postplace: this.state.postplace
    };
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await api.post("/api/checkout/charge", {
      token,
      shoppingCart,
      userInformation
    });

    console.log(response);
    if (response) {
      this.setState({ complete: true });
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete!</h1>;
    if (
      !this.state.name ||
      !this.state.telephone ||
      !this.state.address ||
      !this.state.postnumber ||
      !this.state.postplace
    )
      return (
        <div className="checkout-input">
          <CheckoutInput
            handleInputChange={this._handleInputChange}
            name={this.state.name}
            telephone={this.state.telephone}
            address={this.state.address}
            postnumber={this.state.postnumber}
            postplace={this.state.postplace}
          />
        </div>
      );
    return (
      <div className="stripe-checkout-container">
        <div className="checkout-input">
          <CheckoutInput
            handleInputChange={this._handleInputChange}
            name={this.state.name}
            telephone={this.state.telephone}
            address={this.state.address}
            postnumber={this.state.postnumber}
            postplace={this.state.postplace}
          />
        </div>
        <div className="stripe-checkout-card-info">Kort informasjon:</div>
        <div className="stripe-payment-window">
          <CardElement
            style={{ width: "10vw", base: { fontSize: "20px", width: "10vw" } }}
          />
        </div>
        <button className="stripe-pay-button" onClick={this.submit}>
          Betal
        </button>
      </div>
    );
  }

  _handleInputChange(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }
}

export default injectStripe(CheckoutForm);
