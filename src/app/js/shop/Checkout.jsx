import React, { Component } from "react";
import api from "../utils/api";
import Products from "./Products";

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
      <div>
        <div className="navigation-fix" />
        {mappedProducts}
        <br/>
        <br/>
        <button>Betal!</button>
      </div>
    );
  }
}

export default Checkout;
