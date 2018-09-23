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

    const mappedProducts = this.state.products.map((el, index) => (
      <Products
        product={el.name}
        image={el.image}
        price={el.price}
        quantity={el.quantity}
        key={index}
      />
    ));

    return (
      <StripeProvider apiKey="pk_test_Hu2hQvuxdFzg6dJJUBD65JW9">
        <div>
          {/* <div className="navigation-fix" />
          <div className="checkout-cart-container">
          <h1>Handlekurv:</h1>
          <div className="checkout-mapped-products">
          {mappedProducts}
          <hr/>
          </div>
          <h1 className="checkout-cart-total">Total Pris:</h1>
          <div className="checkout-cart-total-price">
          {this.state.totalPrice}
          ,-
          </div>
          </div> */}
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
