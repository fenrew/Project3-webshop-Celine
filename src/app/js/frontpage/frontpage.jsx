import React, { Component } from "react";
import Carousel from "./Carousel";
import Information from "./Information"

class Frontpage extends Component {
  render() {
    return (
      <div className="frontpage-container">
        <Carousel />
        <Information />
      </div>
    );
  }
}

export default Frontpage;
