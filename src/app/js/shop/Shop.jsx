import React, { Component } from "react";
import OilsMain from "./OilsMain";
import OilsNavigation from "./OilsNavigation";
import CheckoutShop from "./CheckoutShop";
import api from "../utils/api";
import { Redirect } from "react-router";
import CheckoutPage from "./Checkout"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethericOils: [],
      search: "",
      checkout: [],
      toCheckout: false,
      products: "",
      redirect: false,
      totalPrice: 0,
      widthQuickBuy: "0%",
      colorQuickBuy: "transparent",
      fontsizeQuickBuyHeader: "0",
      fontsizeQuickBuyElement: "0",
    };

    this.checkoutWidth = 100;

    this._handleQuery = this._handleQuery.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._removeProduct = this._removeProduct.bind(this);
    this._openQuickBuy = this._openQuickBuy.bind(this);
  }

  componentDidMount() {
    api.get("/api/products").then(products => {
      this.setState({
        products: products.result
      });
    });
    api.get("/api/shop/user").then(user => {
      let newTotalPrice = 0;
      user.result.shoppingCart.map(
        el => (newTotalPrice += el.price * el.quantity)
      );
      this.setState({
        checkout: user.result.shoppingCart,
        totalPrice: newTotalPrice
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

    if (this.state.redirect) {
      return <Redirect push to="/shop/checkout" />;
    }

    const newMappedProducts = this.state.products.filter(el =>
      el.name.toLowerCase().includes(this.state.search)
    );
    let mappedOilProducts;
    if (!this.state.toCheckout) {
      mappedOilProducts = newMappedProducts.map((el, index) => (
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
    } else {
      mappedOilProducts = <CheckoutPage />
    }

    const mappedCheckout = this.state.checkout.map((el, index) => (
      <CheckoutShop
        name={el.name}
        image={el.image}
        price={el.price}
        quantity={el.quantity}
        addToCart={this._addToCart}
        object={el}
        removeProduct={this._removeProduct}
        totalPrice={this.state.totalPrice}
        key={index}
      />
    ));

    if (this.state.checkout.length === 0) this.checkoutWidth = { width: "0%" };
    else {
      this.checkoutWidth = { width: "18%" };
    }

    let quickBuyStyle = {
      width: this.state.widthQuickBuy
    };
    let quickBuyStyleHeader = {
      color: this.state.colorQuickBuy,
      fontSize: this.state.fontsizeQuickBuyHeader
    };
    let quickBuyStyleElement = {
      fontSize: this.state.fontsizeQuickBuyElement
    }
    let quickBuyStyleButton = {
      left: this.state.widthQuickBuy
    }

    let mappedOilNavigation;

    if (this.state.colorQuickBuy === "black") {
      mappedOilNavigation = this.state.products.map((el, index) => (
        <OilsNavigation
          object={el}
          name={el.name}
          price={el.price}
          stocked={el.stocked}
          addToCart={this._addToCart}
          key={index}
        />
      ));
    }

    return (
      <div id="the-whole-shop-container">
        <div className="navigation-fix" />

        {/* NAVIGATION TABLE */}
        <div className="shop-navigation" style={quickBuyStyle}>
          <h3 className="quick-buy" style={quickBuyStyleHeader}>
            Hurting Kjøp
          </h3>
          <div className="mapped-navigation-contents" style={quickBuyStyleElement}>
            {mappedOilNavigation}
          </div>
        </div>
        <button
          className="quick-buy-button"
          style={quickBuyStyleButton}
          onClick={() => {
            this._openQuickBuy();
          }}
        >
          Hurtig Kjøp
        </button>

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
          <div className="checkout-container" style={this.checkoutWidth}>
            <button
              className="clear-checkout-button"
              onClick={() => {
                this._clearCart();
              }}
            >
              Clear
            </button>
            <div>{mappedCheckout}</div>
            <br />
            <div className="total-price-checkout">
              Total Pris: {this.state.totalPrice}
              ,-
            </div>
            <button
              className="to-checkout-button"
              onClick={this._handleRedirectCart}
            >
              Gå til kassen
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }

  _handleRedirectCart = () => {
    this.setState({
      toCheckout: true,
      // redirect: true
    });
  };

  _handleQuery(event) {
    this.setState({
      search: event.target.value.toLowerCase()
    });
  }

  _openQuickBuy() {
    if (this.state.colorQuickBuy === "black") {
      return this.setState({
        colorQuickBuy: "transparent",
        widthQuickBuy: "0%",
        fontsizeQuickBuyHeader: "0",
        fontsizeQuickBuyElement: "0",
      });
    } else {
      return this.setState({
        colorQuickBuy: "black",
        widthQuickBuy: "15%",
        fontsizeQuickBuyHeader: "2vw",
        fontsizeQuickBuyElement: "1.6vw"
      });
    }
  }

  _addToCart(product) {
    let newArray;
    let duplicate = false;
    let newTotalPrice = this.state.totalPrice + product.price;
    newArray = this.state.checkout;
    newArray.map(el => {
      if (el._id === product._id) {
        duplicate = true;
        return (el.quantity += 1);
      } else return el;
    });
    if (duplicate === false) {
      product.quantity += 1;
      newArray.push(product);
    }
    this.setState({
      checkout: newArray,
      totalPrice: newTotalPrice
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
      checkout: [],
      totalPrice: 0
    });
    api.get("/api/shop/user").then(user => {
      user.result.shoppingCart = this.state.checkout;
      user = user.result;
      return api.post("/api/shop/cart", { user });
    });
  }

  _removeProduct(product) {
    let newArray = this.state.checkout;
    let newTotalPrice = this.state.totalPrice - product.price;
    newArray.map(el => {
      if (el._id === product._id) {
        if (el.quantity > 0) {
          el.quantity -= 1;
        }
        if (el.quantity === 0) {
          let index = newArray.indexOf(el);
          newArray.splice(index, 1);
        } else return el;
      } else return el;
    });
    this.setState({
      checkout: newArray,
      totalPrice: newTotalPrice
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
