import React, { Component } from "react";
import api from "../utils/api";
import Products from "./Products";
import CheckoutForm from "./CheckoutForm";
// import {CardElement, injectStripe} from 'react-stripe-elements';
import "babel-polyfill";

import { Elements, StripeProvider } from "react-stripe-elements";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: ""
    };
  }

  componentDidMount() {
    api.get("/api/shop/user").then(user => {
      this.setState({
        products: user.result.shoppingCart
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

    const mappedProducts = this.state.products.map((el, index) => (
      <Products product={el.name} key={index} />
    ));

    return (
      <StripeProvider apiKey="pk_test_Hu2hQvuxdFzg6dJJUBD65JW9">
        <div>
          <div className="navigation-fix" />
          {mappedProducts}
          <br />
          <br />
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;
