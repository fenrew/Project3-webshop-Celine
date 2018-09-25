import React, { Component } from 'react';
import EachItem from "./EachItem";
import api from "../utils/api";

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      color: "white",
    };

    this._changeColor = this._changeColor.bind(this);
  }

  componentDidMount(){
    let id = this.props.id
    api.post("/api/get/productId", {id}).then((product) => {
      let newColor = product.newColor
      this.setState({
        color: newColor,
        loading: false,
      })
    })
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
    const mappedItems = this.props.items.map((el, index) => (
      <EachItem
        name={el.name}
        quantity={el.quantity}
        price={el.price}
        key={index}
      />
    ));
  
    let datoSpliced = this.props.date
    let newDatoSpliced = datoSpliced.substring(0, 10)
    let newTimeSplice = datoSpliced.substring(11, 16)
    let betalt = "Nei";
    if (this.props.charged) betalt = "Ja";
      
    let newBackgroundColor = {
      backgroundColor: this.state.color,
    }
    return (
      <div className="each-purchase-container" style={newBackgroundColor}>
      <button className="each-purchase-button" onClick={() => {this._changeColor()}}></button>
        <div className="each-purchase-information">
          <h2>Informasjon:</h2>
          <div className="text-box-info">
            <div className="text-box-info-first-box">
              <b>Navn:</b> <br/>
              <b>E-post:</b> <br />
              <b>Telefon:</b> <br />
              <b>Adresse:</b> <br />
              <b>Postnr:</b> <br />
              <b>Poststed:</b> <br />
              <b>Total Pris:</b> <br />
              <b>Betalt:</b> <br />
              <b>Dato:</b> <br />
              <b>Tid:</b> <br />
            </div>
            <div>
              {this.props.name} <br />
              {this.props.epost} <br />
              {this.props.telephone} <br />
              {this.props.address} <br />
              {this.props.postnumber} <br />
              {this.props.postplace} <br />
              {this.props.totalPrice} kroner <br />
              {betalt} <br />
              {newDatoSpliced} <br/>
              {newTimeSplice} <br/>
            </div>
          </div>
        </div>
        <div className="each-purchase-products">
          <h2>Produkter:</h2>
          {mappedItems}
        </div>
      </div>
    );
  }

  _changeColor(){
    this.setState({
      color: "green"
    });
    let id = this.props.id
    api.post("/api/post/productId", {id})
  }
}

export default Purchase;