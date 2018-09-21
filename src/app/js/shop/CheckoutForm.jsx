import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import api from "../utils/api"

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await api.post("/api/checkout/charge", {
      token
    });

    console.log(response)
    //if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <div className="stripe-payment-window">
        <CardElement style={{width: "25%",}} />
        </div>
        <button onClick={this.submit}>Betal</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
