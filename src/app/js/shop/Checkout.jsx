import React, { Component } from "react";
import api from "../utils/api";
import CheckoutForm from "./CheckoutForm";
import "babel-polyfill";

import { Elements, StripeProvider } from "react-stripe-elements";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: "",
      totalPrice: 0,
      user: ""
    };
  }

  componentDidMount() {
    api.get("/api/shop/user").then(user => {
      let newTotalPrice = 0;
      user.result.shoppingCart.map(
        el => (newTotalPrice += el.price * el.quantity)
      );
      this.setState({
        products: user.result.shoppingCart,
        totalPrice: newTotalPrice,
        user: user
      });
    });
  }

  render() {
    if (!this.state.products)
      return (
        <div>
          <div className="navigation-fix" />
          <h1>Loading...</h1>
        </div>
      );

    return (
      <StripeProvider apiKey="pk_test_Hu2hQvuxdFzg6dJJUBD65JW9">
        <div>
          <div className="StripeElement">
          <br/>
          <br/>
          <br/>
          <Elements>
            <CheckoutForm user={this.state.user} />
          </Elements>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;
