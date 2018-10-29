import React, { Component } from "react";
import Carousel from "./Carousel";
import Information from "./Information";
import BlogPosts from "./BlogPosts";
import Sale from "./Sale";

class Frontpage extends Component {
  render() {
    return (
      <div className="frontpage-container">
        <Carousel />
        <Information />
        <BlogPosts />
        <Sale />
      </div>
    );
  }
}

export default Frontpage;
