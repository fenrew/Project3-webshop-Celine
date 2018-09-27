import React, { Component } from "react";
import CarouselText from "./CarouselText";

class NewCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.carouselImages = [
      "blueberries.png",
      "oils-background-image.png",
      "heart-oil-background.png",
      "foot-picture.png"
    ];
    this.carouselCounter = -1;
  }

  render() {
    <CarouselText />;
    return <div />;
  }
}

export default NewCarousel;
