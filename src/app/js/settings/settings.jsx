import React, { Component } from "react";
import { userInfo } from "os";
import api from "../utils/api";
import Purchase from "./Purchase";
import { Redirect } from "react-router";

class settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      purchasedItems: [],
      redirectBlog: false,
      redirectSale: false,
    };

    this._handleRedirectBlog = this._handleRedirectBlog.bind(this);
    this._handleRedirectSale = this._handleRedirectSale.bind(this);

  }

  componentDidMount() {
    api.get("/api/purchased").then(purchasedItemsTwo => {
      let mappedItems = purchasedItemsTwo.result.map((el, index) => (
        <Purchase
          epost={el.userEpost}
          name={el.userInformation.name}
          telephone={el.userInformation.telephone}
          address={el.userInformation.address}
          postnumber={el.userInformation.postnumber}
          postplace={el.userInformation.postplace}
          items={el.items}
          totalPrice={el.totalPrice}
          charged={el.charged}
          date={el.date}
          id={el._id}
          key={index}
        />
      ));
      this.setState({
        purchasedItems: mappedItems,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="navigation-fix" />
          <h1>This site is only for admins</h1>
        </div>
      );
    }

    if (this.state.redirectBlog) return <Redirect push to="/create-blog-post" />;
    if (this.state.redirectSale) return <Redirect push to="/create-sale" />

    const mappedPurchasedItems = this.state.purchasedItems;

    return (
      <div>
        <div className="navigation-fix" />
        <div className="add-more-flex-container">
          <div className="add-blog-post">
            <div
              className="add-blog-post-text"
              onClick={this._handleRedirectBlog}
            >
              Skriv et nytt blogg innlegg
            </div>
          </div>
          <div className="add-sale" onClick={this._handleRedirectSale}>
            <div className="add-sale-text">Nytt tilbud</div>
          </div>
        </div>
        <div className="whole-container">{mappedPurchasedItems}</div>
      </div>
    );
  }

  _handleRedirectBlog = () => {
    this.setState({
      redirectBlog: true
    });
  };

  _handleRedirectSale = () => {
    this.setState({
      redirectSale: true,
    })
  }
}

export default settings;
