import React, { Component } from "react";
import api from "../utils/api";

class createSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      text: "",
      success: false,
    };

    this._handleChange = this._handleChange.bind(this);
    this._createSale = this._createSale.bind(this);
  }

  render() {

    if(this.state.success) return (
        <div>
            <div className="navigation-fix"></div>
            <div className="create-sale-container">
                <h1>{this.state.header}</h1>
                <p>{this.state.text}</p>
            </div>
        </div>
    )

    return (
      <div>
        <div className="navigation-fix" />
        <div className="create-sale-container">
          <input
            type="text"
            placeholder="Overskrift"
            onChange={evt => this._handleChange("header", evt.target.value)}
          />
          <br />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Text"
            onChange={evt => this._handleChange("text", evt.target.value)}
          />
          <button onClick={() => this._createSale()}>Lagre</button>
        </div>
      </div>
    );
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  _createSale() {
    api.post("/api/create-sale", {
        header: this.state.header,
        text: this.state.text,
    }).then(result => {
        if(result === true) {
            this.setState({
                success: true,
            })
        }
    })
  }
}

export default createSale;
