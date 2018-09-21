import React, { Component } from "react";
import OilsMain from "./OilsMain";
import OilsNavigation from "./OilsNavigation";
import CheckoutShop from "./CheckoutShop";
import api from "../utils/api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethericOils: [],
      search: "",
      checkout: [],
      products: ""
    };

    this._handleQuery = this._handleQuery.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._removeProduct = this._removeProduct.bind(this);
  }

  componentDidMount() {
    api.get("/api/products").then(products => {
      this.setState({
        products: products.result
      });
    });
    api.get("/api/shop/user").then(user => {
      this.setState({
        checkout: user.result.shoppingCart
      });
    });
  }

  render() {
    if (!this.state.products) {
      return (
        <div>
          <div className="navigation-fix" />
          <h1>Loading...</h1>
        </div>
      );
    }

    const newMappedProducts = this.state.products.filter(el =>
      el.name.toLowerCase().includes(this.state.search)
    );

    const mappedOilProducts = newMappedProducts.map((el, index) => (
      <OilsMain
        object={el}
        name={el.name}
        price={el.price}
        stocked={el.stocked}
        info={el.info}
        image={el.image}
        addToCart={this._addToCart}
        key={index}
      />
    ));

    const mappedOilNavigation = this.state.products.map((el, index) => (
      <OilsNavigation
        object={el}
        name={el.name}
        price={el.price}
        stocked={el.stocked}
        addToCart={this._addToCart}
        key={index}
      />
    ));

    const mappedCheckout = this.state.checkout.map((el, index) => (
      <CheckoutShop
        name={el.name}
        image={el.image}
        price={el.price}
        quantity={el.quantity}
        addToCart={this._addToCart}
        object={el}
        removeProduct={this._removeProduct}
        key={index}
      />
    ));

    return (
      <div id="the-whole-shop-container">
        <div className="navigation-fix" />
        {/* <div className="shop-background-overlay"> */}

        {/* NAVIGATION TABLE */}
        <div className="shop-navigation">
          <h3 className="quick-buy">Hurting Kjøp</h3>
          <div className="mapped-navigation-contents">
            {mappedOilNavigation}
          </div>
        </div>

        <div className="shop-flexbox-container">
          {/* SEARCH */}
          <div className="search-and-shop-container">
            <div className="search">
              <form>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Søk..."
                  onChange={event => this._handleQuery(event)}
                />
                <br />
              </form>
            </div>

            {/* MAIN CARDS */}
            <div className="card-container">{mappedOilProducts}</div>
          </div>

          {/* CHECKOUT SHOP */}
          <div className="checkout-container">
            <button
              onClick={() => {
                this._clearCart();
              }}
            >
              Clear
            </button>
            <div>{mappedCheckout}</div>
            <br />
            <button className="to-checkout-button">Betal!</button>
            <br />
            <br />
          </div>
        </div>
      </div>
      // </div>
    );
  }

  _handleQuery(event) {
    this.setState({
      search: event.target.value.toLowerCase()
    });
  }

  _addToCart(product) {
    let newArray;
    let duplicate = false;
    newArray = this.state.checkout;
    newArray.map(el => {
      if (el._id === product._id) {
        duplicate = true;
        return (el.quantity += 1);
      } else return el;
    });
    if (duplicate === false) newArray.push(product);
    this.setState({
      checkout: newArray
    });
    api.get("/api/shop/user").then(user => {
      if (!user) return;
      user.result.shoppingCart = newArray;
      user = user.result;
      return api.post("/api/shop/cart", { user });
    });
  }

  _clearCart() {
    this.setState({
      checkout: []
    });
    api.get("/api/shop/user").then(user => {
      user.result.shoppingCart = this.state.checkout;
      user = user.result;
      return api.post("/api/shop/cart", { user });
    });
  }

  _removeProduct(product) {
    let newArray = this.state.checkout;
    newArray.map(el => {
      if (el._id === product._id) {
        el.quantity -= 1;
        if (el.quantity === 0) {
          let index = newArray.indexOf(el);
          newArray.splice(index, 1);
        } else return el;
      } else return el;
    });
    this.setState({
      checkout: newArray
    });
    api.get("/api/shop/user").then(user => {
      if (!user) return;
      user.result.shoppingCart = newArray;
      user = user.result;
      return api.post("/api/shop/cart", { user });
    });
  }
}

export default App;
