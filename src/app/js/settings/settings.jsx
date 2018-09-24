import React, { Component } from "react";
import { userInfo } from "os";
import api from "../utils/api";
import Purchase from "./Purchase";

class settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      purchasedItems: []
    };
  }

  componentDidMount() {
    api.get("/api/purchased").then(purchasedItemsTwo => {
      console.log(purchasedItemsTwo);
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
          key={index}
        />
      ));
      console.log(mappedItems);
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
          <h1>Loading...</h1>
        </div>
      );
    }

    const mappedPurchasedItems = this.state.purchasedItems;

    return (
      <div>
        <div className="navigation-fix" />
        {mappedPurchasedItems}
      </div>
    );
  }
}

export default settings;
