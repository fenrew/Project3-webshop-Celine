import React, { Component } from "react";
import api from "../utils/api";

class Sale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      text: "",
      sale: false,
    };
  }

  componentDidMount() {
    api.get("/api/sale").then(result => {
      console.log(result);
      this.setState({
        header: result.header,
        text: result.text,
        sale: true,
      });
    });
  }

  render() {
      if(this.state.sale) return (
      <div className="sales-container">
        <div className="sales-border-container">
          <h1 className="sales-header">{this.state.header}</h1>
          <div className="sales-text">{this.state.text}</div>
        </div>
      </div>
    );

    return (
        <div></div>
    )
  }
}

export default Sale;
