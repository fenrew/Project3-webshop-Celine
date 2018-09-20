import React, { Component } from "react";
import productsJson from "./data.json";
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
      checkout: ["Oregano", "Oregano"],
      products: ""
    };

    this._handleQuery = this._handleQuery.bind(this);
    this._addToCart = this._addToCart.bind(this);
  }

  componentDidMount() {
    api.get("/api/products").then(products => {
      this.setState({
        products: products.result
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
        name={el.name}
        price={el.price}
        stocked={el.stocked}
        info={el.info}
        image={el.image}
        addToCart={this._addToCart}
        key={index}
      />
    ));
    const mappedOilNavigation = newMappedProducts.map((el, index) => (
      <OilsNavigation
        name={el.name}
        price={el.price}
        stocked={el.stocked}
        addToCart={this._addToCart}
        key={index}
      />
    ));

    const mappedCheckout = this.state.checkout.map((el, index) => (
      <CheckoutShop checkout={el} key={index} />
    ));

    return (
      <div>
        <div className="navigation-fix" />
        <div className="shop-flexbox-container">
          {/* <div className="shop-background-overlay"> */}

          {/* NAVIGATION TABLE */}
          <div className="shop-navigation">
            <h3 className="quick-buy">Hurting Kjøp</h3>
            <table>
              <tbody>{mappedOilNavigation}</tbody>
            </table>
          </div>

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
          <div>
            <div>{mappedCheckout}</div>
            <br />
            <button>Betal!</button>
            <br />
            <br />
            <button
              onClick={() => {
                this._clearCart();
              }}
            >
              Clear
            </button>
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

  _addToCart(name) {
    console.log(name);
    let newArray = this.state.checkout;
    newArray.push(name);
    this.setState({
      checkout: newArray
    });
  }

  _clearCart() {
    this.setState({
      checkout: []
    });
  }
}

export default App;
